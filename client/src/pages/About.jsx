export default function About() {
  return (
    <div className="p-10 sm:p-20 px-4 max-w-6xl mx-auto text-green-950">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-customDarkGreen">
          Welcome to <span className="text-customNormGreen">Ham</span> Estate
        </h1>
        <p className="text-lg font-light">
          The easiest way to list, sell, rent, or find your next property.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-customDarkGreen">
          About Us
        </h2>
        <p className="mb-6">
          At <span className="font-bold text-customNormGreen">Ham Estate</span>,
          we empower property owners to list their homes for sale or rent,
          connecting them directly with potential buyers and tenants. Whether
          you're looking to rent out your house or find your dream home, we
          provide a platform where both property owners and buyers meet their
          goals.
        </p>
        <p className="mb-6">
          Our user-friendly API allows you to manage your property listings with
          ease, offering features that cater to both individual homeowners and
          larger property agencies. Our seamless process ensures that all
          interactions, from listing to closing deals, are straightforward and
          transparent.
        </p>
        <p>
          Whether you are selling, renting, or buying, Ham Estate simplifies
          every step, ensuring you have the best tools and guidance to make the
          process enjoyable and efficient.
        </p>
      </section>

      <section className="bg-customNormGreen rounded-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Get in Touch</h2>
        <p className="mb-6 text-center">
          Have any questions about listing, selling, or finding a property?
          We're here to assist you!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 text-center">
          <div>
            <h3 className="text-xl font-semibold">Call Us</h3>
            <p>(123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Email Us</h3>
            <p>support@hamestate.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Visit Us</h3>
            <p>123 Real Estate Blvd, City, Country</p>
          </div>
        </div>
      </section>
    </div>
  );
}
