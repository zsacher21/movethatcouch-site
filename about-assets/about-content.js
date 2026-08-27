(function () {
  'use strict';

  const aboutContentHtml = `
    <h1 class="about-title"><span class="about-title-mobile-line">About</span> <span class="about-title-mobile-line">MOVE THAT</span> <span class="about-title-mobile-line">COUCH!</span></h1>

    <section class="about-section">
      <h2>What we do</h2>
      <p>MOVE THAT COUCH! helps people connect with nearby independent service providers for furniture delivery, furniture assembly, mounting services, junk removal, and other local service requests.</p>
      <p>Customers post a request, service providers send quotes, and the customer chooses the option that works best for them.</p>
    </section>

    <section class="about-section">
      <h2>How the platform works</h2>
      <p>MOVE THAT COUCH! is a technology platform. We make it easy for customers and independent service providers to find each other, communicate, and coordinate services.</p>
      <p>MOVE THAT COUCH! does not provide delivery, assembly, mounting, hauling, junk removal, or other services offered through the platform.</p>
      <p>Service providers use their own vehicles, tools, equipment, and supplies, set their own prices, and operate independently.</p>
    </section>

    <section class="about-section">
      <h2>Where MOVE THAT COUCH! is available</h2>
      <p>MOVE THAT COUCH! is intended to be available throughout the United States, including U.S. territories, subject to service provider availability and local requirements.</p>
      <p>Available services vary by location and depend on the independent service providers operating in each area.</p>
    </section>

    <section class="about-section">
      <h2>Payments</h2>
      <p>When a quote is accepted, a booking deposit is paid securely in-app to reserve the service. Booking deposits use a tiered rate and are capped at $65. Payments are processed by Stripe, a leading online payment processor used by millions of businesses worldwide.</p>
      <p>The remaining balance is paid to the service provider according to the terms agreed upon between the customer and provider. MOVE THAT COUCH! provides an optional way for customers to securely pay the remaining balance through the app, but customers and service providers are free to use another payment method they mutually agree upon.</p>
      <p>Deposit, refund, and cancellation policies are shown before booking.</p>
    </section>

    <section class="about-section">
      <h2>Insurance &amp; responsibility</h2>
      <p>Service providers using MOVE THAT COUCH! are responsible for complying with all applicable laws and regulations, including any licensing, registration, certification, and insurance requirements.</p>
      <p>Service providers may choose to share insurance information in their profile. Any insurance information is optional and self-reported by the provider.</p>
      <p>Customers can review provider profiles, ratings, reviews, photos, pricing, and other information shared by providers before deciding who to hire.</p>
      <p>MOVE THAT COUCH! does not provide insurance and does not conduct background checks or verify licenses, certifications, qualifications, or insurance coverage of service providers.</p>
    </section>

    <section class="about-section">
      <h2>Ratings &amp; reviews</h2>
      <p>Customers and service providers can leave ratings and reviews after completed services. Reviews help users make informed decisions when choosing who to work with on the platform.</p>
    </section>

    <section class="about-section">
      <h2>Platform &amp; service provider roles</h2>
      <p>Service providers are independent and are not employees, agents, or contractors of MOVE THAT COUCH!. All services are provided by the independent service provider selected by the customer.</p>
    </section>

    <section class="about-section">
      <h2>Why MOVE THAT COUCH! exists</h2>
      <p>Finding help with a furniture delivery, assembly project, mounting job, junk removal request, or other local service need should not be complicated.</p>
      <p>MOVE THAT COUCH! was built to make connecting customers and independent service providers faster, clearer, and more flexible for everyone involved.</p>
    </section>

    <section class="about-section about-legal">
      <h2>Legal</h2>
      <p>For full details about how the platform works, please review our <a href="https://legal.movethatcouch.com/tos.html" target="_blank">Terms of Service</a> and <a href="https://legal.movethatcouch.com/privacy.html" target="_blank">Privacy Policy</a>.</p>
    </section>
  `;

  function renderAboutContent(root) {
    if (!root) return;
    root.innerHTML = aboutContentHtml;
  }

  window.MTCAboutContent = Object.freeze({
    render: renderAboutContent,
  });

  document.querySelectorAll('[data-about-content]').forEach(renderAboutContent);
})();