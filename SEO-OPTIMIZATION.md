# SEO Optimization Checklist

## ✅ Completed

### Metadata & Tags
- [x] Root layout metadata with title template
- [x] Meta descriptions with keywords and pricing
- [x] OpenGraph tags for social sharing
- [x] Twitter card metadata
- [x] Robots meta directives
- [x] Page-specific metadata (Services, Contact, Quote)

### Structured Data (JSON-LD)
- [x] LocalBusiness schema
- [x] Website schema with search action
- [x] Services schema with pricing
- [x] FAQ schema

### Technical SEO
- [x] Dynamic sitemap.xml generation
- [x] robots.txt configuration
- [x] Proper URL structure

---

## 📋 TODO - Next Steps

### 1. Google Search Console Setup
- [ ] Create/login to Google Search Console (https://search.google.com/search-console)
- [ ] Add property for `lumorapro.netlify.app`
- [ ] Get verification code and add to `src/app/layout.tsx`:
  ```typescript
  verification: {
    google: 'your-verification-code-here',
  },
  ```
- [ ] Submit sitemap: `https://lumorapro.netlify.app/sitemap.xml`

### 2. Social Media OG Image
- [ ] Create a 1200x630px OG image for social sharing
- [ ] Save as `/public/og-image.jpg`
- [ ] Add to layout.tsx:
  ```typescript
  openGraph: {
    images: ['/og-image.jpg'],
  },
  ```

### 3. Add Social Media Links
Update `src/components/structured-data.tsx` LocalBusinessSchema:
- [ ] Add Twitter/X profile URL
- [ ] Add LinkedIn profile URL
- [ ] Add GitHub profile URL
- [ ] Add any other social profiles

### 4. Google Analytics
- [ ] Set up Google Analytics 4 property
- [ ] Add GA4 tracking ID to the site
- [ ] Configure conversion tracking for quote submissions

### 5. Performance Optimization
- [ ] Run Lighthouse audit
- [ ] Optimize images (already using Next.js Image)
- [ ] Check Core Web Vitals scores
- [ ] Ensure mobile responsiveness

### 6. Content SEO
- [ ] Add alt text to all images
- [ ] Ensure proper heading hierarchy (H1 > H2 > H3)
- [ ] Add internal linking between pages
- [ ] Consider adding a blog for content marketing

### 7. Local SEO (Optional)
- [ ] Create Google Business Profile
- [ ] Add business to local directories
- [ ] Collect customer reviews

---

## 🔗 Useful Links

- **Google Search Console**: https://search.google.com/search-console
- **Google Analytics**: https://analytics.google.com
- **PageSpeed Insights**: https://pagespeed.web.dev
- **Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org

---

## 📊 Current Site URLs

- **Sitemap**: https://lumorapro.netlify.app/sitemap.xml
- **Robots.txt**: https://lumorapro.netlify.app/robots.txt

---

## Notes

- The site is configured for UK locale (en_GB)
- Prices are in GBP (£)
- Contact: hello@lumora.dev
- WhatsApp: +44 7359 792 577
