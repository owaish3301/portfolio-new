import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { siteConfig } from "@/data/siteConfig";
import "../styles/fonts.css";
import "../styles/globals.css";

export const viewport: Viewport = {
  themeColor: "#1e2df6",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "Md Owaish Alam",
    "Owaish",
    "Owais",
    "Md Owaish",
    "Owaish Alam",
    "Md Owaish Alam portfolio",
    "Owaish portfolio",
    "Owais portfolio",
    "Full Stack Developer",
    "Frontend Developer",
    "Web Developer ITER SOA",
    "owaish3301",
  ],
  authors: [{ name: siteConfig.name }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.svg",
  },
  verification: {
    google: "6Y7oPEiZE1UAPYLxqDkDKbpbapFpEgyiGtJdIVAh7ps",
  },
  openGraph: {
    type: "website",
    url: siteConfig.siteUrl,
    title: `${siteConfig.name} (${siteConfig.nickname}) - Full Stack Developer Portfolio`,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.siteUrl}/shadow-dp2.png`,
      },
    ],
    siteName: `${siteConfig.name} Portfolio`,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} (${siteConfig.nickname}) - Full Stack Developer`,
    description: siteConfig.description,
    images: [`${siteConfig.siteUrl}/shadow-dp2.png`],
    site: siteConfig.socials.twitter.username,
    creator: siteConfig.socials.twitter.username,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.siteUrl}/#person`,
      name: siteConfig.name,
      alternateName: [
        "Owaish",
        "Owais",
        "Md Owaish",
        "Owaish Alam",
        "owaish3301",
      ],
      givenName: "Md Owaish",
      familyName: "Alam",
      jobTitle: "Full Stack Developer",
      description: siteConfig.description,
      url: `${siteConfig.siteUrl}/`,
      image: `${siteConfig.siteUrl}/shadow-dp2.png`,
      email: `mailto:${siteConfig.email}`,
      sameAs: [
        siteConfig.socials.github.url,
        siteConfig.socials.linkedin.url,
        siteConfig.socials.twitter.url,
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "ITER, Siksha 'O' Anusandhan (SOA) University",
      },
      worksFor: {
        "@type": "Organization",
        name: siteConfig.currentRole.company,
        url: siteConfig.currentRole.companyUrl,
      },
      knowsAbout: [
        "Web Development",
        "Full Stack Development",
        "Frontend Engineering",
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Tailwind CSS",
        "PostgreSQL",
        "MongoDB",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.siteUrl}/#website`,
      url: `${siteConfig.siteUrl}/`,
      name: `${siteConfig.name} Portfolio`,
      alternateName: [
        "Owaish Portfolio",
        "Owais Portfolio",
        "Md Owaish Portfolio",
        "Md Owaish Alam Portfolio",
      ],
      publisher: {
        "@id": `${siteConfig.siteUrl}/#person`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteConfig.siteUrl}/#profilepage`,
      url: `${siteConfig.siteUrl}/`,
      name: `${siteConfig.name} (${siteConfig.nickname}) - Full Stack Developer`,
      mainEntity: {
        "@id": `${siteConfig.siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Z552KRBYBG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z552KRBYBG');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xsuttmmgmd");
          `}
        </Script>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
