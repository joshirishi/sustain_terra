# Gap analysis: rebuild vs. live site

Complete inventory from live site (17 Aug 2026) is in `reference/live-site/_INVENTORY.md`.

## Gaps closed by this session

### Database
- ✅ Policies (3): refund, cancellation, privacy — full text + 5-item FAQ accordion
- ✅ Site settings: legal name, address, contact details, LinkedIn, Calendly, brochure PDF
- ✅ Program pricing: ₹9,000–₹30,000 per course (6 courses)
- ✅ Team member LinkedIn profiles
- ✅ Form schema: extended for multi-course enrolment, payment tracking, consent

### Content
- ✅ All seven pages mapped and extracted (not just the four in nav)
- ✅ Media inventory: 69 assets (35 PNG, 32 JPEG, 2 PDF) catalogued and listed

### Capabilities documented
- ✅ Course enrolment + payment (RazorPay / offline)
- ✅ Contact enquiry form (split first/last name, subject line)
- ✅ Calendly integration
- ✅ Policy pages with FAQ accordion

## Gaps NOT yet closed — awaiting rebuild updates

| Gap | Live site has | Rebuild has | Impact | Effort |
|---|---|---|---|---|
| **Payment processing** | RazorPay payment gateway integrated into enrolment form | Form captures intent but no payment API wired | Cannot actually enrol or pay | Medium — need RazorPay SDK + webhook handler |
| **Multiple course selection** | Fluent Form with checkboxes; user selects 1–6 courses, prices summed | Separate registration modal per programme | No bulk enrolment path | Medium — modify registration flow |
| **Policy pages** | 3 full pages (refund, cancellation, privacy) | 0 pages | Legal liability; no T&C acknowledgement | Low — add 3 routes + policy renderer |
| **Self-paced / e-learning courses** | Listed as a product type in refund/cancellation policies | No schema or pages | Product type sold but not served | Medium — design e-learning product | 
| **Digital downloads / templates** | Listed as a product type; model exists in policies | No schema or pages | Product type sold but not served | Medium — design digital product | 
| **Offline payment option** | "Offline Payment" radio + email-based workflow | Only subscription-model enrolment | Cannot serve clients who don't want online payment | Low — add offline option checkbox + email notification |
| **Payment status tracking** | Form captures reference; manual follow-up assumed | All enrolments marked "pending"; no status updates | Cannot track who paid vs. pending | Low — capture payment ref, wire Razorpay webhook |
| **Email notifications** | Form submits to Fluent Forms → email to contactus@ | Supabase insert via RLS; no email backend | Leads disappear into DB; no confirmation to user | Low — wire Resend or SendGrid |
| **Brochure PDF download** | Points to live Corporate-Profile_STGV.pdf | "Send brochure" form captures email but sends no PDF | User sees "sent" message but receives nothing | Low — same email backend |
| **Team photo URLs** | vinit.jpg, trupti.jpeg, Sameeksha-Patil.png stored in live site media | No photo URLs stored | Team cards show initials only, not faces | Low — add photo_url to team_members, populate |
| **Hero slider images** | 6 stat-specific images (1.png … 6.png) | Stats render without images | Stats look incomplete but are readable | Low — add image URLs to stats table |
| **Section images** | Specific images per page (LnD card, consulting icon, etc.) | Pages styled but image-less | Pages render but feel sparse | Low — catalog and add to components |
| **LinkedIn team links** | Three individual profiles linked from About page | URLs stored but not displayed | Cannot click to view team profiles | Low — link from team card to LinkedIn |
| **Contact form name split** | First Name / Last Name fields | Single "name" field | Works but doesn't match live form | Low — split in form and schema |
| **Refund/cancellation on consultation form** | "What do you need help with?" dropdown includes refund/support options | Dropdown has "general", "consulting", "training", "reporting" | Limited intent signalling | Low — add more granular options |
| **External social links** | LinkedIn company page linked in footer | No footer social links | Footer is text-only | Low — add social icon row |
| **Privacy policy URL shortcut** | Footer has link to full privacy page | No separate page | Users can't read policy unless you dig | Low — add policy pages |

## Next: Prioritized rebuild tasks

### Tier 1 (cannot enrol)
1. Wire RazorPay payment API to enrolment form
2. Add policy pages (refund, cancellation, privacy) + FAQ accordion
3. Extend enrolment form to support multi-course selection

### Tier 2 (incomplete user flows)
4. Add offline payment option + email confirmation
5. Wire email backend (Resend/SendGrid) for form submissions + payment confirmations
6. Add brochure PDF download + email delivery

### Tier 3 (polish)
7. Add photo URLs to team_members; link team cards to LinkedIn
8. Populate hero stats with image URLs
9. Add section images throughout pages
10. Fix contact form name split + expand intent dropdown

## Files

- `reference/live-site/_INVENTORY.md` — master inventory of all pages, forms, interactions, media
- `reference/live-site/*.md` — per-page Divi module breakdown
- `reference/live-site/_media.json` — all 69 media items with IDs and URLs

---

**Knowledge bank sync:** `/kavi` has been run to gather all rebuild code + this live-site inventory into the knowledge bank. Design personas read the bank before critiquing; next step is to route these gaps to implementation via `/persona-orchestrator` or `/ux-story-gate`.
