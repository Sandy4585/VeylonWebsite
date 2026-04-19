import type { ContactFormValues } from "@/lib/contact/contact-form-schema";
import type { UtilityContactFormValues } from "@/lib/contact/utility-contact-form-schema";

export type ContactInquiryTemplateInput =
  | { kind: "general"; data: ContactFormValues }
  | { kind: "utility"; data: UtilityContactFormValues };

function istTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Subject: "New Veylon inquiry — [Department] from [Name]" (department defaults to "General inquiry" when omitted) */
export function contactInquiryTemplate(input: ContactInquiryTemplateInput): {
  subject: string;
  html: string;
  text: string;
} {
  const submittedAt = istTimestamp(new Date());

  if (input.kind === "utility") {
    const d = input.data;
    const department = d.department;
    const subject = `New Veylon inquiry — ${department} from ${d.name}`;

    const textLines = [
      "Utility-scale contact inquiry",
      "",
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Company: ${d.company}`,
      `Department: ${department}`,
      `Consent to contact: Yes`,
      "",
      "Message:",
      d.message,
      "",
      `Submitted (IST): ${submittedAt}`,
    ];

    const htmlBody = `
<p><strong>Name:</strong> ${escapeHtml(d.name)}</p>
<p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
<p><strong>Company:</strong> ${escapeHtml(d.company)}</p>
<p><strong>Department:</strong> ${escapeHtml(department)}</p>
<p><strong>Consent to contact:</strong> Yes</p>
<hr style="border:none;border-top:1px solid #ccc;margin:1rem 0" />
<p><strong>Message</strong></p>
<pre style="white-space:pre-wrap;font-family:inherit;margin:0">${escapeHtml(d.message)}</pre>
<p style="margin-top:1.5rem;color:#444;font-size:0.9em"><strong>Submitted (IST):</strong> ${escapeHtml(submittedAt)}</p>
`.trim();

    return {
      subject,
      html: `<!DOCTYPE html><html><body style="font-family:system-ui,Segoe UI,sans-serif;line-height:1.5;color:#111">${htmlBody}</body></html>`,
      text: textLines.join("\n"),
    };
  }

  const d = input.data;
  const departmentChosen = d.department?.trim();
  const subjectDepartment = departmentChosen || "General inquiry";
  const subject = `New Veylon inquiry — ${subjectDepartment} from ${d.name}`;

  const phoneLine = d.phone?.trim();

  const textLines: string[] = [
    "Contact form inquiry",
    "",
    `Name: ${d.name}`,
    `Email: ${d.email}`,
  ];
  if (phoneLine) {
    textLines.push(`Phone: ${phoneLine}`);
  }
  if (departmentChosen) {
    textLines.push(`Department: ${departmentChosen}`);
  }
  textLines.push(`Consent to contact: Yes`, "", "Message:", d.message, "", `Submitted (IST): ${submittedAt}`);

  const htmlParts: string[] = [
    `<p><strong>Name:</strong> ${escapeHtml(d.name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(d.email)}</p>`,
  ];
  if (phoneLine) {
    htmlParts.push(`<p><strong>Phone:</strong> ${escapeHtml(phoneLine)}</p>`);
  }
  if (departmentChosen) {
    htmlParts.push(`<p><strong>Department:</strong> ${escapeHtml(departmentChosen)}</p>`);
  }
  htmlParts.push(
    `<p><strong>Consent to contact:</strong> Yes</p>`,
    `<hr style="border:none;border-top:1px solid #ccc;margin:1rem 0" />`,
    `<p><strong>Message</strong></p>`,
    `<pre style="white-space:pre-wrap;font-family:inherit;margin:0">${escapeHtml(d.message)}</pre>`,
    `<p style="margin-top:1.5rem;color:#444;font-size:0.9em"><strong>Submitted (IST):</strong> ${escapeHtml(submittedAt)}</p>`,
  );

  const htmlBody = htmlParts.join("\n");

  return {
    subject,
    html: `<!DOCTYPE html><html><body style="font-family:system-ui,Segoe UI,sans-serif;line-height:1.5;color:#111">${htmlBody}</body></html>`,
    text: textLines.join("\n"),
  };
}
