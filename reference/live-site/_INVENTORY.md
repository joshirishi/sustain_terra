# sustainterra.com — complete content & capability inventory

Captured 17 Aug 2026 from the live site. Sources: WP REST API (`/wp-json/wp/v2/pages`,
`/media`) for authoritative content, plus rendered HTML for the Divi theme-builder
header/footer and the Fluent Forms embeds, which do not appear in page content.

Platform: WordPress + **Divi builder 4.27.4** (not Elementor) + **Fluent Forms** + **RazorPay**.

## 1. Pages — 7 published, not 4

| # | Slug | Title | Modules | In main nav? |
|---|---|---|---|---|
| 1 | `home` | Home | 24 | yes |
| 2 | `learning-and-development` | Learning and Development | 36 | yes |
| 3 | `counsulting-services` | Counsulting Services *(typo is in the live URL)* | 25 | yes |
| 4 | `about-us` | About Us | 31 | yes |
| 5 | `privacy-policy` | Privacy Policy | 27 | footer only |
| 6 | `refund-policy` | Refund Policy | 3 | footer only |
| 7 | `cancellation-rescheduling-policy` | Cancellation & Rescheduling Policy | 3 | footer only |

0 blog posts. No sitemap.xml. `robots.txt` disallows `/wp-admin/` only.

Full per-page content is in the sibling `.md` files in this folder.

## 2. What a visitor can do today — every interaction

| Capability | Where | Mechanism |
|---|---|---|
| **Enrol and pay for a course** | L&D `#register` | Fluent Form 6 → **RazorPay** or offline payment |
| Select multiple courses in one enrolment | L&D `#register` | Checkbox group, prices summed |
| Accept T&Cs + Privacy Policy | L&D `#register` | Required consent checkbox |
| Send a contact enquiry | Home `#Contact_Us` | Fluent Form 1 |
| Book a consultation call | Home, Consulting, About | Calendly (external) |
| Download the corporate brochure | L&D | Direct PDF link |
| Read the three legal policies | Footer | Static pages |
| View team LinkedIn profiles | About | External links, per person |
| Follow the company | Footer / header | LinkedIn company page |
| Phone / email the company | Footer | `tel:` + `mailto:` |

### Course enrolment — exact prices

| Course | Price | Form field |
|---|---|---|
| Essentials of Sustainability | ₹9,000 *(discounted)* | `payment_input` |
| GHG Accounting | ₹10,500 *(discounted)* | `payment_input_1` |
| Materiality Assessment | ₹20,000 | `payment_input_2` |
| Sustainability Reporting – BRSR/GRI/CDP/TCFD | ₹25,000 | `payment_input_3` |
| Climate Risk | ₹30,000 | `payment_input_4` |
| Decarbonization Roadmap | ₹30,000 | `payment_input_5` |

Section heading: "Select courses to register". Payment method radio: **Offline Payment** /
**Pay with RazorPay**. Submit label: "Submit Form".

### Contact form fields (Fluent Form 1)

First Name · Last Name · Email · Phone/Mobile · Organisation Name · Subject · Your Message

### Course registration fields (Fluent Form 6)

First Name · Last Name · Email Address · Phone Number · course checkboxes · payment method · consent

## 3. Real business details

- **Registered name:** Sustain Terra Green Ventures LLP
- **Address:** 101/A, Spring Dale CHS, 3rd Golibar Rd., Santa Cruz (E), Mumbai – 400 055, India
- **Phone:** +91 9321472266
- **Email:** contactus@sustainterra.com (general), trupti@sustainterra.com (COO)
- **Calendly:** https://calendly.com/vinit-sustainterra/consultation
- **LinkedIn (company):** https://www.linkedin.com/company/sustain-terra-green-ventures-llp/
- **Governing law:** India. GST applies to fees.
- **Policy effective date:** 23 December 2025

### Leadership LinkedIn profiles

- Vinit Gosalia — https://www.linkedin.com/in/vinit-gosalia-3854a42a
- Trupti Sawant — https://www.linkedin.com/in/trupti-sawant21
- Dr. Sameeksha Patil — https://www.linkedin.com/in/sameeksha-sp-ph-d-034626103

## 4. Footer (Divi theme builder — not in page content)

Tagline: "Enabling the sustainability transition through learning, consulting, and innovative tools."

Columns: **Our Services** (Home · Learning & Development · Consulting Services) ·
**Resources — "Coming Soon…"** · **Contact Us** (address, phone, email).

Bottom bar: "© 2025 Sustain Terra Green Ventures LLP. All rights reserved." ·
Privacy Policy · Refund Policy · Cancellation Policy ·
"Sustain Terra Green Ventures (STGV) is committed to environmental sustainability and ethical business practices."

## 5. Media — 69 items

35 PNG · 32 JPEG · **2 PDF**

- `Corporate-Profile_STGV.pdf` — the brochure every "Download Brochure" CTA points at
- `Privacy-Policy.pdf`

Team photos: `vinit.jpg`, `trupti.jpeg`, `Sameeksha-Patil.png`.
Hero slides: `1-scaled.png` … `6.png` (one per statistic).
Section imagery: `LnD-scaled.jpg`, `consulting-scaled.jpg`, `approach.png`, `accounting2-scaled.jpg`,
`sus_windmills-scaled.jpg`, `sustain_training2/3`, `materiality2.jpg`, `sustain4.jpg`, `101-scaled.jpg`,
`online-university-20.jpg`.

Full list with IDs and MIME types: `_media.json`.

## 6. Policy substance the clone must carry

**Refund Policy** — refund tables by timing (Table A public cohorts: ≥14 days 100%, 8–13 days 90%,
3–7 days 75%, <72h none; Table B corporate: 30% deposit non-refundable, tiered 50%/100% charges),
7-day money-back on self-paced courses under 20% consumption, refunds to original instrument,
2-business-day initiation SLA, force majeure terms.

**Cancellation & Rescheduling** — one free reschedule ≥72h, ₹1,000 per later change, 25% fee inside
72h, free seat transfer ≥24h, no-show counts as attended; corporate one free reschedule ≥10 business
days; STGV-initiated changes give new date / 6-month credit note / full refund.

**Privacy Policy** — 5-item FAQ accordion (data protection, what is collected, deletion requests,
cookies, who can access) plus sections on User Data Rights, Data Collection Consent, Third-Party
Services, Policy Updates, User Responsibilities.

Product types sold: public/live cohorts · corporate/private training · consulting retainers ·
**self-paced e-learning** · **digital downloads/templates/recordings** · bundles.
