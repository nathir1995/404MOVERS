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
    slug: "accepting-these-terms",
    title: "Accepting these Terms",
    content: (
      <>
        <p>
          <strong>
            BY DOWNLOADING THE APP OR OTHERWISE ACCESSING OR USING THE 404MOVERS
            PLATFORM, YOU AGREE TO BE BOUND BY ALL OF THE TERMS BELOW.
          </strong>{" "}
          Please read all of the terms before you use the 404MOVERSs Platform.
          If a term does not make sense to you, please let us know. If you
          don&apos;t agree to all of the terms below, you may not use the
          404MOVERS Platform.
        </p>
      </>
    ),
  },
  {
    slug: "contractual-relationship",
    title: "Contractual Relationship",
    content: (
      <>
        <p>
          These Terms of Use (&quot;Terms&quot;) govern the access or use by
          you, an individual, from within Canada and possessions of
          applications, websites, content, products, and services (the
          &quot;Services&quot;) made available in Canada and possessions by
          404MOVERS, Inc and its subsidiaries and affiliates (collectively,
          &quot;404MOVERS &quot;). PLEASE READ THESE TERMS CAREFULLY BEFORE
          ACCESSING OR USING THE SERVICES. In this Agreement, the words
          &quot;including&quot; and &quot;include&quot; mean &quot;including,
          but not limited to.&quot;
        </p>
        <br />
        <p>
          Your access and use of the Services constitutes your agreement to be
          bound by these Terms, which establishes a contractual relationship
          between you and 404MOVERS. If you do not agree to these Terms, you may
          not access or use the Services. These Terms expressly supersede prior
          agreements or arrangements with you. 404MOVERS may immediately
          terminate these Terms or any Services with respect to you, or
          generally cease offering or deny access to the Services or any portion
          thereof, at any time for any reason.
        </p>
        <br />
        <p>
          Supplemental terms may apply to certain Services, such as policies for
          a particular event, activity or promotion, and such supplemental terms
          will be disclosed to you in connection with the applicable Services.
          Supplemental terms are in addition to, and shall be deemed a part of,
          the Terms for the purposes of the applicable Services. Supplemental
          terms shall prevail over these Terms in the event of a conflict with
          respect to the applicable Services.
        </p>

        <br />
        <p>
          404MOVERS may amend the Terms related to the Services from time to
          time. Amendments will be effective upon 404MOVERS posting of such
          updated Terms at this location or the amended policies or supplemental
          terms on the applicable Service. Your continued access or use of the
          Services after such posting constitutes your consent to be bound by
          the Terms, as amended.
        </p>

        <br />
        <h5>USER REQUIREMENTS AND CONDUCT</h5>
        <p>
          The Service is not available for use by persons under the age of 18.
          You may not authorize third parties to use your Account, and you may
          not allow persons under the age of 18 to receive moving or logistics
          services from Third Party Providers unless they are accompanied by
          you. You may not assign or otherwise transfer your Account to any
          other person or entity. You agree to comply with all applicable laws
          when using the Services, and you may only use the Services for lawful
          purposes (e.g., no transport of unlawful or hazardous materials). You
          will not in your use of the Services cause nuisance, annoyance,
          inconvenience, or property damage, whether to the Third-Party Provider
          or any other party. In certain instances, 404MOVERS may require you to
          provide proof of identity to access or use the Services, and you agree
          that you may be denied access or use of the Services if you refuse to
          provide proof of identity.
        </p>
        <br />
        <p>
          The 404MOVERS app was designed for on-demand hauling and moving of
          your items, not for you personally. Any driver who transports a user
          during the transaction, is doing so completely under their own
          personal insurance and liability. This is not a service that 404MOVERS
          provides. This breaches your agreement with 404MOVERS. Please use your
          best judgment and proceed with caution before getting in the vehicle
          with another person.
        </p>

        <br />
        <h5>PROMOTIONAL CODES</h5>
        <p>
          404MOVERS may, in 404MOVERS’ sole discretion, create promotional codes
          that may be redeemed for Account credit or other features, or benefits
          related to a Third-Party Provider&apos;s services, subject to terms
          that 404MOVERS establish on a per promotional code basis (&quot;Promo
          Codes&quot;). You agree that Promo Codes: (i) must be used for the
          intended audience and purpose, and in a lawful manner; (ii) may not be
          duplicated, sold or transferred in any manner, or made available to
          the general public, unless expressly permitted by 404MOVERS; (iii) may
          be disabled by 404MOVERS at any time for any reason without liability
          to 404MOVERS; (iv) may only be used pursuant to the specific terms
          that 404MOVERS establish for such Promo Code; (v) are not valid for
          cash; and (vi) may expire prior to your use. 404MOVERS reserves the
          right to withhold or deduct credits or other features or benefits
          obtained through the use of Promo Codes by you or any other user in
          the event that 404MOVERS determines or believes that the use or
          redemption of the Promo Code was in error, fraudulent, illegal, or in
          violation of the applicable Promo Code terms or these Terms.
        </p>

        <br />
        <h5>USER PROVIDED CONTENT</h5>
        <p>
          404MOVERS may, in 404MOVERS’ sole discretion, permit you from time to
          time to submit, upload, publish or otherwise make available to
          404MOVERS through the Services textual, audio, and/or visual content
          and information, including commentary and feedback related to the
          Services, initiation of support requests, and submission of entries
          for competitions and promotions (&quot;User Content&quot;). Any User
          Content provided by you remains your property. However, by providing
          User Content to 404MOVERS, you grant 404MOVERS a worldwide, perpetual,
          irrevocable, transferrable, royalty-free license, with the right to
          sublicense, to use, copy, modify, create derivative works of,
          distribute, publicly display, publicly perform, and otherwise exploit
          in any manner such User Content in all formats and distribution
          channels now known or hereafter devised (including in connection with
          the Services and 404MOVERS’ business and on third- party sites and
          services), without further notice to or consent from you, and without
          the requirement of payment to you or any other person or entity.
        </p>
        <br />
        <p>
          You represent and warrant that: (i) you either are the sole and
          exclusive owner of all User Content or you have all rights, licenses,
          consents and releases necessary to grant 404MOVERS the license to the
          User Content as set forth above; and (ii) neither the User Content nor
          your submission, uploading, publishing or otherwise making available
          of such User Content nor 404MOVERS’ use of the User Content as
          permitted herein will infringe, misappropriate or violate a third
          party&apos;s intellectual property or proprietary rights, or rights of
          publicity or privacy, or result in the violation of any applicable law
          or regulation.
        </p>
        <br />
        <p>
          You agree to not provide User Content that is defamatory, libelous,
          hateful, violent, obscene, pornographic, unlawful, or otherwise
          offensive, as determined by 404MOVERS in its sole discretion, whether
          or not such material may be protected by law. 404MOVERS may, but shall
          not be obligated to, review, monitor, or remove User Content, at
          404MOVERS’ sole discretion and at any time and for any reason, without
          notice to you.
        </p>
      </>
    ),
  },
  {
    slug: "the-services",
    title: "The Services",
    content: (
      <>
        <p>
          The Services constitute a technology platform that enables users of
          404MOVERS’ applications or websites provided as part of the Services
          (each, an &quot;Application&quot;) to arrange and schedule moving
          and/or logistics services with third party providers of such services,
          including independent third-party moving providers and third-party
          logistics providers under agreement with 404MOVERS or certain of
          404MOVERS&apos; subsidiaries (&quot;Third Party Providers&quot;).
          Unless otherwise agreed by 404MOVERS in a separate written agreement
          with you, the Services are made available solely for your personal,
          noncommercial use.
        </p>
        <br />
        <p>
          YOU ACKNOWLEDGE THAT 404MOVERS DOES NOT PROVIDE MOVING OR LOGISTICS
          SERVICES OR FUNCTION AS A MOVING CARRIER. 404MOVERS&apos; SERVICES MAY
          BE USED BY YOU TO REQUEST AND SCHEDULE MOVING OR LOGISTICS SERVICES
          WITH THIRD PARTY PROVIDERS, BUT YOU AGREE THAT 404MOVERS HAS NO
          RESPONSIBILITY OR LIABILITY TO YOU RELATED TO ANY MOVING OR LOGISTICS
          PROVIDED TO YOU BY THIRD PARTY PROVIDERS THROUGH THE USE OF THE
          SERVICES OTHER THAN AS EXPRESSLY SET FORTH IN THESE TERMS
        </p>
        <br />
        <p>
          404MOVERS DOES NOT GUARANTEE THE SUITABILITY, SAFETY OR ABILITY OF
          THIRD-PARTY PROVIDERS. IT IS SOLELY YOUR RESPONSIBILITY TO DETERMINE
          IF A THIRD-PARTY PROVIDER WILL MEET YOUR NEEDS AND EXPECTATIONS.
          404MOVERS WILL NOT PARTICIPATE IN DISPUTES BETWEEN YOU AND A
          THIRD-PARTY PROVIDER. BY USING THE SERVICES, YOU ACKNOWLEDGE THAT YOU
          MAY BE EXPOSED TO SITUATIONS INVOLVING THIRD PARTY PROVIDERS THAT ARE
          POTENTIALLY UNSAFE, OFFENSIVE, HARMFUL TO MINORS, OR OTHERWISE
          OBJECTIONABLE, AND THAT USE OF THIRD-PARTY PROVIDERS ARRANGED OR
          SCHEDULED USING THE SERVICES IS AT YOUR OWN RISK AND JUDGMENT.
          404MOVERS SHALL NOT HAVE ANY LIABILITY ARISING FROM OR IN ANY WAY
          RELATED TO YOUR TRANSACTIONS OR RELATIONSHIP WITH THIRD PARTY
          PROVIDERS.
        </p>
        <br />
        <h5>DISCLAIMER</h5>
        <p>
          THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
          AVAILABLE.&quot; 404MOVERS DISCLAIMS ALL REPRESENTATIONS AND
          WARRANTIES, EXPRESS, IMPLIED, OR STATUTORY, NOT EXPRESSLY SET OUT IN
          THESE TERMS, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN ADDITION,
          404MOVERS MAKES NO REPRESENTATION, WARRANTY, OR GUARANTEE REGARDING
          THE RELIABILITY, TIMELINESS, QUALITY, SUITABILITY, OR AVAILABILITY OF
          THE SERVICES OR ANY GOODS OR SERVICES OBTAINED THROUGH THE USE OF THE
          SERVICES, OR THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE.
          YOU AGREE THAT THE ENTIRE RISK ARISING OUT OF YOUR USE OF THE
          SERVICES, AND ANY THIRD-PARTY GOOD OR SERVICES OBTAINED IN CONNECTION
          THEREWITH, REMAINS SOLELY WITH YOU, TO THE MAXIMUM EXTENT PERMITTED BY
          APPLICABLE LAW.
        </p>
        <br />
        <p>
          THIS DISCLAIMER DOES NOT ALTER YOUR RIGHTS AS A CONSUMER TO THE EXTENT
          NOT PERMITTED UNDER THE LAW IN THE JURISDICTION OF YOUR PLACE OF
          RESIDENCE.
        </p>
      </>
    ),
  },
  {
    slug: "limitation-of-liability",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          TO THE EXTENT NOT PROHIBITED BY LAW, IN NO EVENT WILL 404MOVERS BE
          LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INCIDENTAL, SPECIAL,
          INDIRECT, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES WHATSOEVER
          INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROPERTY, PHYSICAL
          LOSSES, DEATH OR ANY OTHER DAMAGES OR LOSSES, ARISING OUT OF OR
          RELATED TO THESE TERMS, THE 404Movers PLATFORM (INCLUDING THE APP AND
          ANY REQUEST OR BID), SERVICES PERFORMED BY MOVERS, AND/OR THIRD-PARTY
          SERVICES OR MATERIALS, HOWEVER CAUSED, REGARDLESS OF THE THEORY OF
          LIABILITY (CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE, WHETHER
          ACTIVE, PASSIVE OR IMPUTED), PRODUCT LIABILITY, STRICT LIABILITY OR
          OTHER THEORY) AND EVEN IF 404MOVERS HAS BEEN ADVISED OF THE
          POSSIBILITY OF SUCH DAMAGES. SOME STATES DO NOT ALLOW THE EXCLUSION OR
          LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THIS LIMITATION
          MAY NOT APPLY TO YOU.
        </p>
        <br />
        <p>
          FOR ANY LOSS OR DAMAGE THAT IS NOT EXCLUDED UNDER THESE TERMS, THE
          TOTAL LIABILITY OF 404MOVERS AND ITS DIRECTOR, EMPLOYEES, AGENTS,
          AFFILIATES AND INVESTORS WILL NOT EXCEED THE FEE TO DOWNLOAD THE APP
          (IF ANY) AS OPPOSED TO ANY OTHER FEES/COSTS INCLUDING, BUT NOT LIMITED
          TO, ANY FEES ASSOCIATED WITH YOUR DEVICE.
        </p>
      </>
    ),
  },
  {
    slug: "indemnification",
    title: "Indemnification",
    content: (
      <>
        <p>
          You will defend us from and against any actual or threatened suits,
          actions, proceedings (at law or in equity), and claims, and indemnify
          us for any and all damages, payments, deficiencies, fines, judgments,
          settlements, liabilities, losses, costs, and expenses (including
          reasonable attorneys&apos; fees, costs, penalties, interest, and
          disbursements) arising from or related to any of your conduct with
          respect to the 404MOVERS Platform or your violation (or alleged
          violation) of these Terms or the rights of any third party by you or
          any person using your 404MOVERS account.
        </p>
      </>
    ),
  },
  {
    slug: "third-party-software",
    title: "Third Party Software",
    content: (
      <>
        <p>
          The software you download consists of a package of components,
          including certain third party software provided under separate third
          party license terms. Your use of this third party software in
          conjunction with the App in a manner consistent with the terms of
          these Terms is permitted, however, you may have broader rights under
          the applicable third-party license terms, and nothing in these Terms
          is intended to impose further restrictions on your use of this
          third-party software.
        </p>
      </>
    ),
  },
  {
    slug: "description-of-the-404movers-platform",
    title: "Description of the 404MOVERS Platform",
    content: (
      <>
        Through the 404MOVERS Platform, you can submit a request (a{" "}
        <strong>&quot;Request&quot;</strong>) for a Mover to pick up the item(s)
        you specify (each, an <strong>&quot;Item&quot;</strong>) for loading,
        unloading, moving, hauling, packing, lifting, assembly or disassembly
        (the <strong>&quot;Services&quot;</strong>). You will receive price
        quote for the fee that will apply to completing your Request (the{" "}
        <strong>&quot;Services Fee&quot;</strong>). Once you submit the payment
        information for the Request, your Request will be sent out to our
        network of Movers. You will receive a notification through the 404MOVERS
        Platform when a Mover has accepted your Request, and you will be able to
        communicate with that Mover through the 404MOVERS Platform to confirm
        and coordinate certain logistics involved with completing your Request.
        You represent and warrant that the Items related to any Request are your
        personal property and you have all right, title and permission to
        request and allow the loading, unloading, moving, packing, or lifting of
        any Items, and that the performance of the Services by a Mover will not
        result in the violation of any third party&apos;s ownership or privacy
        rights.
      </>
    ),
  },
  {
    slug: "creating-accounts",
    title: "Creating Accounts",
    content: (
      <>
        <p>
          When you create an account you must maintain the security of your
          password and accept all risk that someone may access your account
          without your permission. If you discover or suspect any 404MOVERS
          Platform security breaches, please let us know as soon as possible.
          You represent and warrant to us that all information that you provide
          in connection with your account is accurate, truthful, current and
          complete. 404MOVERS reserves the right to deny any account at our
          discretion.
        </p>
      </>
    ),
  },
  {
    slug: "payment-for-services",
    title: "Payment for Services",
    content: (
      <p>
        You must provide credit card information to submit a Request. You are
        responsible for paying the applicable Services Fee for any completed
        Services. Once you submit a Request, we will place a temporary hold on
        the credit card account you provided in an amount equal to 100% of the
        applicable Services Fee. Once you and the Mover have verified that the
        Services are completed, you will have the option of paying an additional
        gratuity (a <strong>&quot;Tip&quot;</strong>) to the Mover, and your
        credit card account will be charged for the sum of the Services Fee, any
        Tip, and the fees for any additional services you may request. You agree
        to make all payments to the Mover through the 404MOVERS Platform and
        will not pay any Mover in cash or means other than directly through the
        404MOVERS Platform.
      </p>
    ),
  },
  {
    slug: "canceling-a-request",
    title: "Canceling a Request",
    content: (
      <>
        <p>
          If you cancel any Request: (a) before a Mover accepts it, or (b) after
          it has been accepted by a Mover but more than 24 hours before the
          Services are to be performed, you will not be charged, and the hold
          will be lifted on your credit card. If you cancel any Request less
          than 24 hours before the Services are to be performed, your credit
          card account will be charged 20% of the applicable Services Fee.
        </p>
        <br />
        <p>
          In the instance where the Mover attempts to fulfill the Request but
          cannot do so for reasons out of the Mover&apos;s or 404MOVERS’
          control, your credit card will be charged 50% of the applicable
          Services Fee.
        </p>
      </>
    ),
  },
  {
    slug: "right-to-use-the-404movers-platform",
    title: "Right to Use the 404MOVERS Platform",
    content: (
      <>
        <p>
          On the condition that you fully comply with these Terms, 404MOVERS
          grants you a limited, nonexclusive, non-transferable and revocable
          license to access and use the 404MOVERS Platform for your own
          personal, non-commercial use. However, the App may only be used on
          mobile devices that you own or control. The terms of this license will
          also govern any upgrades provided by 404MOVERS that replace and/or
          supplement the original App, unless the upgrade is accompanied by a
          separate license, in which case the terms of that license will govern.
        </p>
        <br />
        <p>
          Except as expressly authorized by these Terms, you may not (a) modify,
          disclose, alter, translate or create derivative works of the 404MOVERS
          Platform, (b) license, sublicense, resell, distribute, lease, rent,
          lend, transfer, assign or otherwise dispose of the 404MOVERS Platform,
          (c) disassemble, decompile or reverse engineer any of the software
          components of the 404MOVERS Platform, (d) copy, frame or mirror any
          part of the 404MOVERS Platform, (e) interfere with or disrupt the
          integrity or performance of the 404MOVERS Platform, or (f) attempt to
          gain unauthorized access to the 404MOVERS Platform or its related
          systems or networks.
        </p>
      </>
    ),
  },
  {
    slug: "prohibited-use-of-the-404movers-platform",
    title: "Prohibited Use of the 404MOVERS Platform",
    content: (
      <>
        <p>
          You may not post or otherwise make available on or through the
          404MOVERS Platform any of the following:
        </p>
        <ul>
          <li>
            <p>
              Private information of any other persons (including names, email
              addresses, phone numbers, Social Security numbers and financial
              information);
            </p>
          </li>
          <li>
            <p>
              Content that is libelous, defamatory, abusive, offensive or
              hateful;
            </p>
          </li>
          <li>
            <p>
              Content that is obscene, pornographic, indecent or sexually
              explicit, depicts graphic, excessive or gratuitous violence;
            </p>
          </li>
          <li>
            <p>
              Content that is illegal, harmful or offensive or that would
              encourage, solicit, foster, glorify or provide instructions for
              any criminal or civil offense;
            </p>
          </li>
          <li>
            <p>
              Content that may infringe, misappropriate or violate any
              intellectual property rights, rights of privacy, rights of
              publicity or any other rights of others;
            </p>
          </li>
          <li>
            <p>
              Viruses, corrupted data or other harmful, disruptive or
              destructive files or code;
            </p>
          </li>
          <li>
            <p>
              Content that, in 404MOVERS’ judgment, is objectionable, may
              restrict or inhibit another from enjoying the 404MOVERS Platform
              or may expose 404MOVERS or users of the 404MOVERS Platform to harm
              or liability of any type;
            </p>
          </li>
          <li>
            <p>
              Content that you are contractually or legally required to keep
              confidential.
            </p>
          </li>
        </ul>
        <br />
        <p>
          Also, you may <strong>NOT</strong> do any of the following in
          connection with the 404MOVERS Platform or other users:
        </p>
        <ul>
          <li>
            <p>
              Use the 404MOVERS Platform in any manner that could interfere
              with, disrupt, negatively affect or inhibit other users from fully
              enjoying the 404MOVERS Platform or that could damage, disable,
              overburden or impair the functioning of the 404MOVERS Platform;
            </p>
          </li>
          <li>
            <p>Collect any personal information about other users;</p>
          </li>
          <li>
            <p>
              Intimidate, threaten, stalk, bully or otherwise harass other
              users;
            </p>
          </li>
          <li>
            <p>
              Post spam or commercial messages through the 404MOVERS Platform;
            </p>
          </li>
          <li>
            <p>
              Create an account or submit a Request if you are not over 13 years
              of age;
            </p>
          </li>
          <li>
            <p>
              Use the 404MOVERS Platform for any illegal or unauthorized purpose
              or to engage in, encourage or promote any activity that is
              unlawful or that violates these Terms;
            </p>
          </li>
          <li>
            <p>
              Circumvent or attempt to circumvent any filtering, security
              measures, rate limits or other features designed to protect the
              404MOVERS Platform, its users, or third parties.
            </p>
          </li>
        </ul>
        <br />
        <p>
          Your use of the 404MOVERS Platform is at your own risk. 404MOVERS is
          not responsible or liable for the conduct of, or your interactions
          with, any other users (whether online or offline) or for any related
          damage or harm. As a provider of interactive services, 404MOVERS is
          not liable for the content of any Requests. Although we have no
          obligation to screen, edit or monitor Requests, we reserve the right,
          and have the discretion, to screen, edit or remove any Requests at any
          time, for any reason and without notice.
        </p>
      </>
    ),
  },
  {
    slug: "disputes-between-you-and-a-mover",
    title: "Disputes between You and a Mover",
    content: (
      <>
        <p>
          The 404MOVERS Platform is merely a neutral means of connecting you
          with Movers. We do not represent or warrant that any Mover will meet
          your expectations or instructions in performing any Services. Any
          dispute that you may have regarding the performance of any Services,
          including any dispute related to the time, place, and manner of doing
          so, is between you and the applicable Mover. 404MOVERS is not
          responsible for the replacement or repair of any of your personal
          property that may be damaged by a Mover while performing the Services.
        </p>
        <br />
        <p>
          Please report any suspected illegal or unethical behavior by a Mover
          during the performance of any Services to:{" "}
          <a href="mailto:nhaioun@maaloumatix.ca" className={styles.link}>
            nhaioun@maaloumatix.ca
          </a>
        </p>
      </>
    ),
  },
  {
    slug: "reporting-and-removal",
    title: "Reporting and Removal",
    content: (
      <>
        <p>
          404MOVERS users may report content to 404MOVERS that they think
          violates these Terms, and 404MOVERS may remove such content, suspend
          or terminate the account of the user who posted or otherwise made
          available such content and/or take additional action to enforce these
          Terms against such user.
        </p>
        <br />
        <p>
          Designated Agent: 2371359 ALBERTA CORP. Address of Designated Agent:
          3110 16 Ave N, Lethbridge, AB T1H 5J6 Email Address of Designated
          Agent: nhaimoun@maaloumatix.ca Phone number of Designated Agent:
          403-929-7665
        </p>
      </>
    ),
  },
  {
    slug: "404movers-rights",
    title: "404MOVERS’ Rights",
    content: (
      <p>
        As between you and 404MOVERS, all information, materials and content of
        the 404MOVERS Platform, including text, graphics, data, formatting,
        graphs, designs, HTML, look and feel, photographs, music, sounds,
        images, software, videos, designs, typefaces, source and object code,
        format, queries, algorithms and other content is owned by 404MOVERS or
        is used with permission. When you create, share, link to, or otherwise
        make available any Requests, you grant us a nonexclusive, royalty-free,
        perpetual, irrevocable and fully sublicensable right to use, reproduce,
        modify, adapt, publish, translate, create derivative works from,
        distribute, perform and display such Requests throughout the world in
        any manner or media, on or off the 404MOVERS Platform. 404MOVERS
        reserves all rights not expressly set forth in these Terms. You hereby
        irrevocably waive in favor of 404MOVERS any and all moral rights that
        you may possess in or to any Requests.
      </p>
    ),
  },
  {
    slug: "feedback",
    title: "Feedback",
    content: (
      <>
        <p>
          Any suggestions, comments or other feedback you give us about the
          404MOVERS Platform (the <strong>&quot;Feedback&quot;</strong>) will
          constitute our confidential information. We are free to use, disclose,
          reproduce, license, distribute and exploit this Feedback as we see
          fit, without compensation to you or any obligation or restriction
          because of any intellectual property rights or otherwise.
        </p>
      </>
    ),
  },
  {
    slug: "location-information",
    title: "Location Information",
    content: (
      <>
        <p>
          The 404MOVERS Platform collects location information, and it will be
          used and disclosed as set forth in the Privacy Policy
        </p>
        <br />
        <p>
          By accepting these Terms or using the App you affirmatively consent to
          404MOVERS’ collection, use, disclosure and storage of your location
          information. You may revoke your consent with respect to 404MOVERS’
          collection, use, disclosure and storage of your location information
          at any time by deleting the App from your mobile device, or by
          changing the privacy settings on your mobile device. Please know that
          if you revoke your consent by doing one of the foregoing or you delete
          or deactivate your account, we may retain certain information as
          required by law or for legitimate business purposes. We may also
          retain cached or archived copies of information about you for a
          certain period.
        </p>
        <br />
        <p>
          If you consent to our collection of location information and you do
          not subsequently stop the collection of this location information,
          404MOVERS will continue to collect this location information. If you
          consent to our collection of location information, subsequently stop
          the collection of this location information and later consent to the
          collection of this location information, 404MOVERS will resume the
          collection of location information.
        </p>
        <br />
        <p>
          404MOVERS takes reasonable measures to protect your location
          information from loss, theft, misuse and unauthorized access,
          disclosure, alteration and destruction.
        </p>
      </>
    ),
  },
  {
    slug: "disclaimers",
    title: "Disclaimers",
    content: (
      <>
        <p>
          EXCEPT AS REQUIRED OTHERWISE OF 404MOVERS BY APPLICABLE LAW, THE
          404MOVERS PLATFORM AND ANY OTHER SERVICE AND CONTENT INCLUDED ON OR
          OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SERVICE (INCLUDING
          REQUESTS) ARE PROVIDED TO YOU ON AN &quot;AS IS,&quot; &quot;AS
          AVAILABLE&quot; BASIS WITHOUT ANY REPRESENTATIONS OR WARRANTIES OF ANY
          KIND. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WE DISCLAIM
          AND EXCLUDE ANY AND ALL OTHER WARRANTIES, CONDITIONS, AND
          REPRESENTATIONS (EXPRESS OR IMPLIED, ORAL OR WRITTEN), AND ALL OTHER
          TERMS WHICH MAY BE IMPLIED INTO THESE TERMS BY LAW, WITH RESPECT TO
          THE 404MOVERS PLATFORM AND CONTENT INCLUDED ON OR OTHERWISE MADE
          AVAILABLE TO YOU THROUGH THE 404MOVERS PLATFORM (INCLUDING REQUESTS)
          AND THE SERVICES PERFORMED BY MOVERS.
        </p>
      </>
    ),
  },
  {
    slug: "changes-to-the-404movers-platform",
    title: "Changes to the 404MOVERS Platform",
    content: (
      <p>
        404MOVERS reserves the right in our discretion to review, improve,
        change or discontinue, temporarily or permanently, the 404MOVERS
        Platform and/or any features, information, materials or content on the
        404MOVERS Platform with or without providing notice to you. 404MOVERS
        will not be liable to you or any third party for any changes or
        discontinuance of the 404MOVERS Platform or any part of the 404MOVERS
        Platform.
      </p>
    ),
  },
  {
    slug: "consent-to-electronic-communications",
    title: "Consent to Electronic Communications",
    content: (
      <p>
        By using the 404MOVERS Platform, you agree that we may communicate with
        you electronically regarding your use of the 404MOVERS Platform and that
        any notices, agreements, disclosures or other communications that we
        send to you electronically will satisfy any legal communication
        requirements, including that the communications be in writing. To
        withdraw your consent from receiving electronic notice, please notify us
        at{" "}
        <a href="mailto:nhaioun@maaloumatix.ca" className={styles.link}>
          nhaioun@maaloumatix.ca
        </a>
        .
      </p>
    ),
  },
  {
    slug: "suspension-and-termination",
    title: "Suspension and Termination",
    content: (
      <>
        <p>
          404MOVERS may suspend or terminate your rights to access or use the
          404MOVERS Platform (including the App) for any reason or for no reason
          at all and with or without notice at 404MOVERS’ discretion. Suspension
          or termination may include restricting access to and use of the App.
          All of the terms of these Terms (excluding the license grant) will
          survive any termination or suspension.
        </p>
        <h5>DAMAGES</h5>
        <p>
          If an item or something that belongs to you is damaged during the
          extent of a 404MOVERS request, 404MOVERS is in no way responsible or
          accountable for covering those damages. However, you can submit a
          claim to nhaimoun@maaloumatix.ca and it can go through the claims
          process. The claims process may include communication with the Moving
          Provider in order to settle any disputes.
        </p>
        <h5>GENERAL</h5>
        <p>
          You may not assign these Terms without 404MOVERS’ prior written
          approval. 404MOVERS may assign these Terms without your consent to:
          (i) a subsidiary or affiliate; (ii) an acquirer of 404MOVERS’ equity,
          business or assets; or (iii) a successor by merger. Any purported
          assignment in violation of this section shall be void. No joint
          venture, partnership, employment, or agency relationship exists
          between you, 404MOVERS or any Third-Party Provider as a result of this
          Agreement or use of the Services. If any provision of these Terms is
          held to be invalid or unenforceable, such provision shall be struck
          and the remaining provisions shall be enforced to the fullest extent
          under law. Our failure to enforce any right or provision in these
          Terms shall not constitute a waiver of such right or provision unless
          acknowledged and agreed to by 404MOVERS in writing.
        </p>
      </>
    ),
  },
  {
    slug: "payment",
    title: "Payment",
    content: (
      <>
        <p>
          You understand that use of the Services may result in payments by you
          for the services you receive from a Third-Party Provider
          (&quot;Charges&quot;). After you have received services obtained
          through your use of the Service, 404MOVERS will facilitate payment of
          the applicable Charges on behalf of the Third-Party Provider, as such
          Third-Party Provider&apos;s limited payment collection agent, using
          the preferred payment method designated in your Account, and will send
          you a receipt by email. Payment of the Charges in such manner shall be
          considered the same as payment made directly by you to the Third-
          Party Provider. Charges will be inclusive of applicable taxes where
          required by law. Charges paid by you are final and non-refundable,
          unless otherwise determined by 404MOVERS. You retain the right to
          request lower Charges from a Third-Party Provider for services
          received by you from such Third-Party Provider at the time you receive
          such services. 404MOVERS will respond accordingly to any request from
          a Third-Party Provider to modify the Charges for a particular service.
        </p>
        <br />
        <p>
          All Charges are due immediately and payment will be facilitated by
          404MOVERS using the preferred payment method designated in your
          Account. If your primary Account payment method is determined to be
          expired, invalid or otherwise not able to be charged, you agree that
          404MOVERS may, as the Third-Party Provider&apos;s limited payment
          collection agent, use a secondary payment method in your Account, if
          available.
        </p>
        <br />
        <p>
          404MOVERS reserves the right to establish, remove and/or revise
          Charges for any or all aspects of the Services at any time in
          404MOVERS’ sole discretion. Further, you acknowledge and agree that
          Charges applicable in certain geographical areas may increase
          substantially during times of high demand of the Services. 404MOVERS
          will use reasonable efforts to inform you of Charges that may apply,
          provided that you will be responsible for Charges incurred under your
          Account regardless of your awareness of such Charges or the amounts
          thereof. 404MOVERS may from time to time provide certain users with
          promotional offers and discounts that may result in different Charges
          for the same or similar Services, and you agree that such promotional
          offers and discounts, unless also made available to you, shall have no
          bearing on your use of the Services or the Charges applied to you. You
          may elect to cancel your request for Services from a Third-Party
          Provider at any time prior to such Third Party Provider&apos;s
          arrival, in which case you may be charged a cancellation fee.
        </p>
        <br />
        <p>
          This payment structure is intended to fully compensate the Third-Party
          Provider for the services provided. 404MOVERS does not designate any
          portion of your payment as a tip or gratuity to the Third-Party
          Provider. You understand and agree that, while you are free to provide
          additional payment as a gratuity to any Third-Party Provider who
          provides you with services obtained through the Service, you are under
          no obligation to do so. Gratuities are voluntary. After you have
          received services obtained through the Service, you will have the
          opportunity to rate your experience and leave additional feedback
          about your Third-Party Provider. In the event you feel unwelcome
          pressure to provide a gratuity, you may factor that experience into
          the rating or additional feedback you give.
        </p>
      </>
    ),
  },
  {
    slug: "third-party-service-provider-representations-and-warranties",
    title: "Third-Party Service Provider Representations and Warranties",
    content: (
      <p>
        For clarity, the Company requires all third-party Service Providers to
        represent and warrant that each Service Provider: (1) is at least 21
        years of age; (2) has the ability to lift and carry heavy items; (3)
        will not allow any User to ride in or otherwise occupy service
        provider’s vehicle while providing the services; (4) possesses a valid
        driver’s license and is authorized to operate a motor vehicle; (5) owns
        the motor vehicle used to provide the service, and that such vehicle was
        manufactured no earlier than the year 2000, is in good operating
        condition, passed an inspection performed by the Company, and complies
        with all applicable statutory and state department of motor vehicle or
        highway patrol requirements for a vehicle of its kind; (6) maintains a
        valid policy of liability insurance in compliance with all legal
        requirements and is a named driver on the insurance policy covering the
        vehicle; (7) will obey all traffic laws and will be solely responsible
        for any violations of such laws; (8) will not discriminate or harass any
        Users on the basis of race, national origin, religion, gender, gender
        identity, physical or mental disability medical condition, marital
        status, are or sexual orientation in violation of any State or Federal
        law; and (9) will not make any representation on behalf of the Company
        or offer or provide transportation or moving service for profit, as a
        public carrier, moving company, or taxi service, charge for moving,
        courier or transportation services or otherwise seek non-voluntary
        compensation from Users, or engage in any other activity in a manner
        that is inconsistent with the obligations of this Agreement.
      </p>
    ),
  },
  {
    slug: "relationship-between-service-providers-and-the-company",
    title: "Relationship between Service Providers and the Company",
    content: (
      <p>
        Service Providers are independent contractors and not employees, owners,
        joint venturers, partners or agents of the Company and there is no
        employment agreement between Service Providers and the Company. In
        addition, Service Providers further understand and agree that they have
        no authority to bind the Company and will not make any representations
        to any party that they have any authority to bind the Company, as an
        employee, partner or otherwise.
      </p>
    ),
  },
];

const TermsOfServicePage: NextPageWithLayout = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/pdf/404movers-terms-of-service.pdf";
    link.download = "404movers - Terms of Service.pdf";
    link.click();
  };

  return (
    <>
      <DocumentTitle title="Terms of Service" />
      <div className={`${styles.page}`}>
        <main className="page__content" style={{ paddingBlock: "3em" }}>
          <h1>
            <span style={{ color: colors.primary }}>404MOVERS</span> Terms of
            Service
          </h1>
          <p style={{ color: "#736C69", marginTop: ".5em" }}>
            Last Revised: February 16, 2022
          </p>
          <br />

          <div style={{ marginBottom: "1.5rem" }}>
            <Button onClick={handleDownload}>Download as PDF</Button>
          </div>

          <p>
            Welcome to 404MOVERSs—the app from 404Movers, Inc.
            (&quot;404MOVERS,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;) that connects you with vehicle owners (each, a
            &quot;Mover&quot;) who will move your stuff wherever you want.
          </p>
          <br />
          <p>
            These Terms of Service (&quot;Terms&quot;) apply to your access and
            use of the application (the &quot;App&quot;), website
            (&quot;Site&quot;) and other online products and services
            (collectively, the &quot;404Movers Platform&quot;) of 404Movers.
          </p>

          <br />

          <section>
            <h3>Table of contents</h3>
            <ol>
              {sections.map((sec) => (
                <li key={sec.slug} style={{ marginBlock: 0 }}>
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

TermsOfServicePage.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default TermsOfServicePage;
