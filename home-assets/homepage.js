(() => {
  const APPLE_APP_ID = '6759010744';
  const ANDROID_PACKAGE = 'com.zmplatforms.movethatcouch';
  const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.zmplatforms.movethatcouch';
  const query = new URLSearchParams(window.location.search);
  const appUrl = (params) => 'https://app.movethatcouch.com/' + (params.toString() ? '?' + params.toString() : '');
  const androidIntentUrl = (params) => {
    const appLinkWithoutScheme = appUrl(params).replace(/^https:\/\//, '');
    return `intent://${appLinkWithoutScheme}#Intent;scheme=https;package=${ANDROID_PACKAGE};S.browser_fallback_url=${encodeURIComponent(PLAY_STORE_URL)};end`;
  };
  const isAndroid = /Android/i.test(navigator.userAgent);
  // Required destination values win over incoming tracking/referral parameters.
  const customerParams = new URLSearchParams(query);
  const providerParams = new URLSearchParams(query);
  providerParams.set('screen', 'driver-new');
  providerParams.set('role', 'driver');
  const customerAppLink = appUrl(customerParams);
  const providerAppLink = appUrl(providerParams);
  const smartBanner = document.querySelector('meta[name="apple-itunes-app"]');
  if (smartBanner) smartBanner.content = `app-id=${APPLE_APP_ID}, app-argument=${customerAppLink}`;
  document.querySelectorAll('.js-get-started').forEach((link) => {
    link.href = isAndroid ? androidIntentUrl(customerParams) : customerAppLink;
  });
  document.querySelectorAll('.js-provider-start').forEach((link) => {
    link.href = isAndroid ? androidIntentUrl(providerParams) : providerAppLink;
  });
  const reviewsSection = document.querySelector('.reviews');
  const reviewsGrid = document.querySelector('.review-grid');
  if (reviewsSection && reviewsGrid) {
    fetch('https://app.movethatcouch.com/api/public/recent-reviews')
      .then((response) => {
        if (!response.ok) throw new Error('Review request failed');
        return response.json();
      })
      .then(({ reviews }) => {
        if (!Array.isArray(reviews) || reviews.length === 0) return;
        reviews.forEach((review) => {
          const card = document.createElement('article');
          card.className = 'review-card';

          const customerHeader = document.createElement('div');
          customerHeader.className = 'review-customer';
          const avatar = document.createElement('span');
          avatar.className = 'review-avatar';
          avatar.setAttribute('aria-hidden', 'true');
          avatar.textContent = review.customerName === 'A customer'
            ? 'MTC'
            : review.customerName.slice(0, 2).toUpperCase();
          const customerDetails = document.createElement('div');
          const customerName = document.createElement('strong');
          customerName.textContent = review.customerName;
          const category = document.createElement('span');
          category.className = 'review-category';
          category.textContent = review.category;
          customerDetails.append(customerName, category);
          customerHeader.append(avatar, customerDetails);

          const stars = document.createElement('div');
          stars.className = 'review-stars';
          stars.setAttribute('aria-label', '5 out of 5 stars');
          stars.textContent = '★★★★★';

          const text = document.createElement('p');
          text.className = 'review-text';
          text.textContent = `“${review.text}”`;

          const meta = document.createElement('div');
          meta.className = 'review-meta';
          const provider = document.createElement('strong');
          provider.className = 'review-provider';
          provider.textContent = `Service provider: ${review.providerName}`;
          meta.append(provider);
          if (review.location) {
            const location = document.createElement('span');
            location.textContent = `Completed service · ${review.location}`;
            meta.append(location);
          }
          card.append(customerHeader, stars, text, meta);
          reviewsGrid.append(card);
        });
        reviewsSection.hidden = false;
      })
      .catch(() => {});
  }
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('in-view'); }), { threshold: .12 });
  document.querySelectorAll('section, article').forEach((el) => observer.observe(el));
})();