# Deployment Checklist

## Pre-Deployment Setup

### 1. Environment Configuration
- [ ] Update `baseUrl` in `src/app/sitemap.ts` with your actual domain
- [ ] Update `baseUrl` in `src/app/robots.ts` with your actual domain
- [ ] Update contact information in `src/components/sections/footer.tsx`
- [ ] Update email addresses in `src/app/contact/page.tsx`
- [ ] Replace placeholder content in `src/data/` files with your actual information

### 2. Content Customization
- [ ] Replace "DevPro" branding with your actual brand name
- [ ] Update `src/data/services.ts` with your service offerings
- [ ] Update `src/data/projects.ts` with your actual projects
- [ ] Update `src/data/testimonials.ts` with real client testimonials
- [ ] Update `src/data/blog-posts.ts` with your blog content
- [ ] Replace placeholder images with actual project screenshots

### 3. SEO & Analytics
- [ ] Set up Google Analytics or preferred analytics service
- [ ] Update `src/components/analytics.tsx` with your tracking code
- [ ] Configure Google Search Console
- [ ] Set up social media Open Graph images
- [ ] Test meta tags and structured data

### 4. Performance & Security
- [ ] Run `npm run build` to check for build errors
- [ ] Test all forms and interactive features
- [ ] Verify responsive design on all devices
- [ ] Check accessibility with screen readers
- [ ] Test loading performance with Lighthouse

## Deployment Options

### Option 1: Vercel (Recommended)
1. Push code to GitHub repository
2. Connect GitHub repo to Vercel
3. Configure environment variables if needed
4. Deploy automatically on push to main branch

### Option 2: Netlify
1. Build the project: `npm run build`
2. Upload the `.next` folder to Netlify
3. Configure redirects and headers
4. Set up continuous deployment

### Option 3: Traditional Hosting
1. Build the project: `npm run build`
2. Upload files to your hosting provider
3. Configure Node.js environment
4. Set up process manager (PM2)

## Post-Deployment

### 1. Testing
- [ ] Test all pages and functionality
- [ ] Verify contact forms are working
- [ ] Check quote calculator functionality
- [ ] Test navigation and responsive design
- [ ] Verify SEO meta tags are correct

### 2. Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure error tracking (Sentry, LogRocket, etc.)
- [ ] Monitor Core Web Vitals
- [ ] Set up analytics dashboards

### 3. Maintenance
- [ ] Regular dependency updates
- [ ] Content updates (blog posts, projects)
- [ ] Performance monitoring
- [ ] Security updates

## Database Setup (Required for Netlify)

**Important**: This app requires a PostgreSQL database. For Netlify deployment, use a cloud PostgreSQL provider.

### Recommended: Supabase (Free)
See **[SUPABASE-SETUP.md](./SUPABASE-SETUP.md)** for detailed setup instructions.

Quick steps:
1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project and save your database password
3. Run `database/init.sql` in Supabase SQL Editor
4. Copy the connection string from Settings → Database → Connection string → URI
5. Add `DATABASE_URL` to Netlify environment variables

### Alternative: Neon (Free)
1. Create account at [neon.tech](https://neon.tech)
2. Create a new project
3. Run `database/init.sql` in the SQL Editor
4. Copy connection string and add to Netlify

## Environment Variables

Create a `.env.local` file for local development:

```env
# Database (Required - use Supabase or Neon for production)
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres

# Security (Required)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long

# App Configuration
NEXT_PUBLIC_BASE_URL=https://your-site.netlify.app
ADMIN_EMAIL=admin@yourdomain.com
NODE_ENV=production

# Email Service (Optional - for notifications)
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=Your Business Name

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Netlify Environment Variables
Add these in Netlify Dashboard → Site settings → Environment variables:
- `DATABASE_URL` - Your Supabase/Neon connection string
- `JWT_SECRET` - Random 32+ character string
- `NEXT_PUBLIC_BASE_URL` - Your Netlify site URL
- `ADMIN_EMAIL` - Admin email address
- `NODE_ENV` - Set to `production`

## Performance Targets

- [ ] Lighthouse Performance Score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Time to Interactive < 3s

## Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured (see vercel.json)
- [ ] Input validation on all forms
- [ ] No sensitive data in client-side code
- [ ] Regular dependency security audits

## Backup Strategy

- [ ] Regular code backups to version control
- [ ] Database backups (if applicable)
- [ ] Content backups
- [ ] Configuration backups

## Launch Strategy

1. **Soft Launch**: Deploy to staging environment first
2. **Testing Phase**: Thorough testing with real users
3. **SEO Setup**: Submit sitemap to search engines
4. **Social Media**: Announce launch on social platforms
5. **Analytics**: Monitor traffic and user behavior
6. **Feedback**: Collect and implement user feedback

## Ongoing Optimization

- Regular performance audits
- A/B testing for conversion optimization
- Content updates and blog posts
- SEO monitoring and improvements
- User experience enhancements based on analytics
