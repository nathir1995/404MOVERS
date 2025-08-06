import React from "react";

import styles from "@/styles/PrivacyPolicy.module.scss";
import Button from "@/components/Button/index";
import DocumentTitle from "@/components/meta/DocumentTitle";
import colors from "@/assets/scss/colors.module.scss";
import { NextPageWithLayout } from "@/layout/types";
import MainLayout from "@/layout/MainLayout";

interface ISection {
  slug: string;
  title: string;
  content: React.ReactNode;
}

const sections: ISection[] = [
  {
    slug: "what-information-we-collect",
    title: "What Information We Collect",
    content: (
      <>
        <p>We collect a variety of types of information:</p>
        <ul>
          <li>
            <p>
              <strong>Contact information,</strong> such as your name, address,
              phone number, or email address;
            </p>
          </li>
          <li>
            <p>
              <strong>Purchase information,</strong> such as the items you
              purchase, payment method and payment information (such as debit or
              credit card number and information), billing and shipping address,
              and contact information (such as for receipts or order updates);
            </p>
          </li>
          <li>
            <p>
              <strong> Preference information</strong> such as your contact and
              marketing preferences;
            </p>
          </li>
          <li>
            <p>
              <strong>Profile and account information,</strong> which may
              include Contact, Purchase, and Preference information as well as
              your account password, and other information about your profile or
              account;
            </p>
          </li>
          <li>
            <p>
              <strong>Demographic information,</strong> which may include age or
              birthdate, gender, ZIP code, and other information about you;
            </p>
          </li>
          <li>
            <p>
              <strong>Call recordings,</strong> including information about your
              call and that you share when you call us on the phone;
            </p>
          </li>
          <li>
            <p>
              <strong>Location information</strong> of your device that you use
              with our application, if your device settings allow us to collect
              location information;
            </p>
          </li>
          <li>
            <p>
              <strong>Device and browsing information,</strong> including
              information about your phone, tablet, computer, or device, and
              online browsing activity (collectively, “automatically collected
              information”). Automatically collected information may include IP
              addresses, unique device identifiers, cookie identifiers, device
              and browser settings and information, and Internet service
              provider information. Automatically collected information also may
              include information about when and how you access and use our
              website or application, such as the date and time of your visit or
              use, the websites you visit before coming and after leaving our
              website, how you navigate and what you search for using our
              website and application, the website pages and items you view
              using our website and application, and the items you purchase.
            </p>
          </li>
        </ul>
      </>
    ),
  },
  {
    slug: "how-we-collect-information",
    title: "How We Collect Information",
    content: (
      <>
        <p>
          We collect information on our website, through our application, and
          during calls with you. We also obtain information from you and from
          third parties. For example, we collect and obtain information:
        </p>
        <ul>
          <li>
            <p>
              <strong>You provide,</strong> such as when you make a purchase,
              interact with a salesperson, visit or contact us, register for a
              Rewards or online account, participate in a contest or
              sweepstakes, respond to a survey, engage in a promotional
              activity, register to attend an event or appointment, apply for
              employment, or sign up for emails or marketing;
            </p>
          </li>
          <li>
            <p>
              <strong>From wi-fi and mobile devices,</strong> such information
              about your device when you use our store wi-fi services; and
              information about your device and location if you have installed
              our application on your device and your device is near our store
              or store systems (such as systems that offer personalized
              content), even if you are not currently using the application,
              though you can disable location sharing using your device or
              application settings;
            </p>
          </li>
          <li>
            <p>
              <strong>From third parties,</strong> such as service providers
              that we use, analytics companies, advertising networks and
              cooperatives, demographic companies, third parties that provide us
              with information about you and the different devices you use
              online, and other third parties that we choose to collaborate or
              work with;
            </p>
          </li>
          <li>
            <p>
              <strong>From social media platforms and networks</strong> that you
              use in connection with our website or application, or that share
              or allow you to share information with us, such as Facebook,
              Twitter, and Instagram. For example, if you use functionalities,
              plugins, widgets, or tools from social media platforms or networks
              in connection with our website or application (e.g., to log into
              an account, or to share inspiration, finds, purchases, and other
              content with your friends and followers on social media), we will
              collect the information that you share with us, or that those
              social media platforms or networks share with us. For more
              information about social media platform and network privacy
              practices, please review the privacy policies and settings of the
              social media platforms and networks that you use;
            </p>
          </li>
          <li>
            <p>
              <strong>Using cookies and automatic collection methods.</strong>{" "}
              For example, we and third parties we work with may collect
              information from the computer, tablet, phone, or other device:
              that you install our application on; that you use to access our
              website; or that you use to open an email or click on an
              advertisement from us. This collection includes automatically
              collected information, and generally does not include personal
              information unless you provide it through our application or
              website or you choose to share it with us. Methods we use include:
            </p>
            <ol>
              <li>
                <p>
                  cookies (which may be session-based or persistent, and are
                  typically small data files that are stored on your hard drive
                  or in connection with your Internet browser);
                </p>
              </li>
              <li>
                <p>
                  web beacons or tags (small images embedded into websites or
                  emails that send information about your computer, tablet,
                  phone, or other device when you visit our website, use or
                  application, or open an email we send to you);
                </p>
              </li>
              <li>
                <p>
                  website and application log files (which we tend to create
                  automatically in connection with access to and use of our
                  website and application);
                </p>
              </li>
              <li>
                <p>
                  Flash cookies or Local Stored Objects (which may be placed
                  using Adobe Flash software—learn more about privacy and
                  storage settings for Flash cookies{" "}
                  <a
                    href="https://www.adobe.com/products/flashplayer/end-of-life.html"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.link}
                  >
                    here
                  </a>
                  );
                </p>
              </li>
              <li>
                <p>
                  other technologies (which may be similar to or different than
                  the methods noted above).
                </p>
              </li>
            </ol>
          </li>
        </ul>
      </>
    ),
  },
  {
    slug: "how-we-use-information",
    title: "How We Use Information",
    content: (
      <>
        <p>
          We use the information that we collect to conduct our business and to
          provide you with the best possible products, services, and
          experiences. We also may combine any or all of the information that we
          collect or obtain. Examples of how we use information include:
        </p>
        <ul>
          <li>
            <p>
              <strong>To provide you with products and services,</strong> such
              as to: fulfill your orders and process your payments; process,
              maintain and service your account(s); and to provide you with
              products and services that we think you will like;
            </p>
          </li>
          <li>
            <p>
              <strong>To respond to you,</strong> such as when you: place an
              order; call us; make a request or inquiry; or share a comment or
              concern;
            </p>
          </li>
          <li>
            <p>
              <strong>For marketing and advertising,</strong> such as to: send
              you marketing and advertising communications; check
              creditworthiness; and to customize the marketing and advertising
              that we show you;
            </p>
          </li>
          <li>
            <p>
              <strong>For analytics,</strong> such as to: understand how you use
              our website and application; determine the methods and devices
              used to access our website and application; and improve our
              website and application;
            </p>
          </li>
          <li>
            <p>
              <strong>For our business purposes,</strong> such as: to operate
              and improve upon our business and lawful business activities; to
              maintain our programs, accounts, and records; for research; to
              determine your satisfaction with our products and services; to
              detect and prevent fraud or misuse of our services; and for any
              other business purpose that is permitted by law;
            </p>
          </li>
          <li>
            <p>
              <strong>For legal and safety purposes,</strong> such as to: defend
              or protect us, our customers, you, or third parties, from harm or
              in legal proceedings; protect our rights; protect our security and
              the security of our customers, employees, and property; respond to
              court orders, lawsuits, subpoenas, and government requests;
              address legal and regulatory compliance; and notify you of product
              recalls or safety issues
            </p>
          </li>
        </ul>
      </>
    ),
  },
  {
    slug: "how-we-share-information",
    title: "How We Share Information",
    content: (
      <>
        <p>
          In general, we do not share personal information about you with third
          parties for third party marketing or advertising purposes. We may
          share personal information with third parties for other purposes. For
          example, we share personal information with:
        </p>
        <ul>
          <li>
            <p>
              <strong>Third parties and service providers</strong> that provide
              products or services to us, that help us market or advertise to
              you, or that provide products or services to you. We may use third
              parties or service providers to perform any of the actions or
              activities allowed under this Policy;
            </p>
          </li>
          <li>
            <p>
              <strong>Social media platforms and networks</strong> such as
              Facebook, Google, Twitter, and Instagram that offer
              functionalities, plugins, widgets, or tools in connection with our
              website or application (e.g., to log into an account, or to share
              inspiration, finds, purchases, and other content with your friends
              and followers on social media). If you choose to use these
              functionalities, plugins, widgets, or tools, certain information
              may be shared with or collected by those social media
              companies—for more information about what information is shared or
              collected, and how it is used, see the applicable social media
              company’s privacy policy;
            </p>
          </li>
          <li>
            <p>
              <strong>Parties to business transactions</strong> such as those we
              deal with in mergers, acquisitions, joint ventures, sales of
              assets, reorganizations, divestitures, dissolutions, bankruptcies,
              liquidations, or other types of business transactions. In these
              types of transactions, personal information may be shared, sold,
              or transferred, and it may be used subsequently by a third party;
            </p>
          </li>
          <li>
            <p>
              <strong>Additional third parties</strong> such as law enforcement,
              government entities, courts, or other third parties as required or
              allowed by applicable law, such as for the legal and safety
              purposes described under the “How We Use Information” Section
              above, or otherwise to help prevent harm or fraud to us, you, our
              customers, or other third parties. We also may share personal
              information with third parties upon your request or with your
              approval, though we may not be able to accommodate all requests.
            </p>
          </li>
        </ul>
      </>
    ),
  },
  {
    slug: "how-long-we-will-keep-information",
    title: "How Long We Will Keep Information",
    content: (
      <>
        <p>
          We retain your Personal Information for the length of time required
          for the specific purpose or purposes for which it was collected and we
          will securely delete that information once we no longer need it. In
          some cases, we may be obliged to store your Personal Information for a
          longer time, taking into account factors including: (a) legal
          obligation(s) under applicable law to retain data for a certain period
          of time; (b) statute of limitations under applicable law(s); and (c)
          guidelines issued by relevant data protection authorities.
        </p>
      </>
    ),
  },
  {
    slug: "use-of-personal-information",
    title: "Use of Personal Information",
    content: (
      <>
        <p>
          404MOVERS may use, or disclose the personal information we collect for
          one or more of the following business purposes:
        </p>
        <ul>
          <li>
            <p>
              To fulfill or meet the reason you provided the information. For
              example, if you share your name and contact information to request
              a price quote or ask a question about our products or services, we
              will use that personal information to respond to your inquiry. If
              you provide your personal information to purchase a product or
              service, we will use that information to process your payment and
              facilitate delivery. We may also save your information to
              facilitate new product orders or process returns.
            </p>
          </li>
          <li>
            <p>
              To provide, support, personalize, and develop our Website,
              products, and services.
            </p>
          </li>
          <li>
            <p>
              To create, maintain, customize, and secure your account with us.
            </p>
          </li>
          <li>
            <p>
              To process your requests, purchases, transactions, and payments
              and prevent transactional fraud.
            </p>
          </li>
          <li>
            <p>
              To provide you with support and to respond to your inquiries,
              including to investigate and address your concerns and monitor and
              improve our responses.
            </p>
          </li>
          <li>
            <p>
              To personalize your Website experience and to deliver content and
              product and service offerings relevant to your interests,
              including targeted offers and ads through our Website, third-party
              sites, and via email or text message (with your consent, where
              required by law).
            </p>
          </li>
          <li>
            <p>
              To help maintain the safety, security, and integrity of our
              Website, products and services, databases and other technology
              assets, and business.
            </p>
          </li>
          <li>
            <p>
              For testing, research, analysis, and product development,
              including to develop and improve our Website, products, and
              services.
            </p>
          </li>
          <li>
            <p>
              To respond to law enforcement requests and as required by
              applicable law, court order, or governmental regulations.
            </p>
          </li>
          <li>
            <p>
              As described to you when collecting your personal information or
              as otherwise set forth in the CPPA.
            </p>
          </li>
          <li>
            <p>
              To evaluate or conduct a merger, divestiture, restructuring,
              reorganization, dissolution, or other sale or transfer of some or
              all of 404MOVERS’ assets, whether as a gccoing concern or as part
              of bankruptcy, liquidation, or similar proceeding, in which
              personal information held by 404MOVERS about our Website users is
              among the assets transferred.
            </p>
          </li>
        </ul>

        <p>
          404MOVERS will not collect additional categories of personal
          information or use the personal information we collected for
          materially different, unrelated, or incompatible purposes without
          providing you notice
        </p>
      </>
    ),
  },
  {
    slug: "sharing-personal-information",
    title: "Sharing Personal Information",
    content: (
      <>
        <p>
          404MOVERS may disclose your personal information to a third party for
          a business purpose. When we disclose personal information for a
          business purpose, we enter a contract that describes the purpose and
          requires the recipient to both keep that personal information
          confidential and not use it for any purpose except performing the
          contract.
        </p>
        <p>
          We share your personal information with the following categories of
          third parties:
        </p>
        <ul>
          <li>
            <p>Service providers.</p>
          </li>
        </ul>
        <ul>
          <li>
            <p>Data aggregators.</p>
          </li>
        </ul>
      </>
    ),
  },
  {
    slug: "how-you-can-contact-us-about-this-policy",
    title: "How You Can Contact Us About this Policy",
    content: (
      <>
        <p>
          Questions about this policy may be directed to{" "}
          <a href="mailto:nhaimoun@maaloumatix.ca" className={styles.link}>
            nhaimoun@maaloumatix.ca
          </a>
          , or you can call us at{" "}
          <a href="tel:(403) 929-7665" className={styles.link}>
            (403) 929-7665
          </a>
        </p>
      </>
    ),
  },
];

const PrivacyPlicyPage: NextPageWithLayout = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/pdf/404movers-privacy-policy.pdf";
    link.download = "404movers - Privacy Policy.pdf";
    link.click();
  };

  return (
    <>
      <DocumentTitle title="Privacy Policy" />
      <div className={`${styles.page}`}>
        <main className="page__content" style={{ paddingBlock: "3em" }}>
          <h1>
            <span style={{ color: colors.primary }}>404MOVERS</span> Privacy
            Policy
          </h1>
          <p style={{ color: "#736C69", marginTop: ".5em" }}>
            Last Revised: February 16, 2022
          </p>
          <br />

          <div style={{ marginBottom: "1.5rem" }}>
            <Button onClick={handleDownload}>Download as PDF</Button>
          </div>

          <p>
            At 404MOVERS, Inc. (“404MOVERS”), we appreciate the trust you place
            in us when you choose to visit our website and we take that
            responsibility seriously. This 404MOVERS Privacy Policy (the
            “Policy”) describes how we collect and use personal information
            about you when you visit our website, use our application, or call
            us on the phone. This Policy also includes the disclosures, rights,
            and obligations required for Canadian consumers and residents under
            the Canadian Consumer Privacy Protection Act (CPPA).
          </p>
          <br />
          <p>
            By “personal information”, we mean information that directly
            identifies you, such as your name, address, or email address. In
            this Policy, “we” and “our” mean 404MOVERS and “you” means any
            person who visits our website or uses our application.
          </p>

          <br />

          <section>
            <h3>Table of contents</h3>
            <ol>
              {sections.map((sec) => (
                <li key={sec.slug}>
                  <a href={`#${sec.slug}`} className={styles.link}>
                    {sec.title}
                  </a>
                </li>
              ))}
            </ol>
          </section>

          {sections.map((sec) => (
            <section key={sec.slug}>
              <span className="anchor" id={sec.slug}></span>
              <h4 id={sec.slug}>{sec.title}</h4>
              {sec.content}
            </section>
          ))}
        </main>
      </div>
    </>
  );
};

PrivacyPlicyPage.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default PrivacyPlicyPage;
