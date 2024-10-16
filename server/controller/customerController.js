const mongoose = require("mongoose");
const Customers = mongoose.model("Customers");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.CreateCustomer = async (req, res) => {
  const { name, email, phone, description, amount } = req.body;

  try {
    const product = await stripe.products.create({
      name: name,
      description: description,
    });

    // Step 2: Create a price for the product
    const price = await stripe.prices.create({
      product: "prod_R2djQZXPGoP97E",
      unit_amount: amount * 100, // Stripe expects amount in cents
      currency: "usd",
      nickname: description,
      // statement_descriptor: "Thank you from DIGS - CTS",
    });

    const customer = await Customers.create({
      name,
      email,
      phone,
      description,
      amount,
    });

    const pageUrl = `https://dignite-payment-form.vercel.app/${customer._id}`;
    customer.pageUrl = pageUrl;

    await customer.save();
    // Step 3: Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_intent_data: {
        statement_descriptor: "Thank you DIGS CTS", // Custom descriptor passed here
      },
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/cancel`,
    });

    // Step 4: Return the session URL to the client
    // res.status(200).json({ url: session.url });

    res
      .status(201)
      .json({ message: "Customer created", customer, url: session.url });
  } catch (error) {
    console.log("create customer err >> ", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.GetCustomers = async (req, res) => {
  try {
    const customers = await Customers.find();
    res.status(200).json({ data: customers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
