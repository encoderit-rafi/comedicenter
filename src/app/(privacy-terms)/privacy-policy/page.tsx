import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Privacy policy",
};
export const dynamic = "force-dynamic";
const Privacy: React.FC = () => {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <div className="main_content_area bg-[#F6F8FB] py-[50px]">
        <div className="container">
          <article className="mx-auto space-y-8 rounded-[12px] border border-[#E3E3E3] bg-white p-6">
            <main className="privacy-terms space-y-4">
              <section>
                <h1 className="mb-4 text-[32px] font-semibold leading-tight text-[#34373C] min-[1024px]:text-[40px] ">
                  Privacy Policy
                </h1>
                <p className="leading-relaxed text-gray-600">
                  Please read this Privacy Policy carefully before using the
                  www.cosmedicenter.com Website (the "Website") operated by
                  Cosmedicenter L.L.C., a Limited Liability Company formed in
                  the State of New Jersey, United States ("us," "we," "our").
                  This Privacy Policy contains important information regarding
                  your privacy and how we may use the information we collect
                  about you.
                </p>
                <p className="mt-2 leading-relaxed text-gray-600">
                  Your access to and use of the Website is conditional upon your
                  acceptance of and compliance with this Privacy Policy. This
                  Privacy Policy applies to everyone, including, but not limited
                  to: visitors, users, and others, who wish to access or use the
                  Website.
                </p>
                <p className="mt-2 leading-relaxed text-gray-600">
                  By accessing or using the Website, you agree to be bound by
                  this Privacy Policy. If you disagree with any part of the
                  Privacy Policy, then you do not have permission to access or
                  use the Website.
                </p>
                <h3 className="mt-2 text-[20px] min-[1024px]:text-[28px]">
                  <b>
                    What information do we collect, where do we get this
                    information, how do we use this information, what happens if
                    we don't have it, and what is the legal basis for processing
                    this information?
                  </b>
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  We collect and store all information that you enter on this
                  Website. In the last 12 months, we have collected and stored
                  the following information about individuals using our Website:
                </p>
                <ul className="mt-2 leading-relaxed text-gray-600">
                  <li>
                    Full Name, Birth Year, Email address, Phone Number,
                    Postal/Shipping address;
                  </li>
                  <li>IP address;</li>
                  <li>Device identifier;</li>
                  <li>
                    Internet or other electronic activity (i.e., information
                    regarding your interaction with our Website or application);
                    and
                  </li>
                  <li>
                    Information about products or services purchased, obtained
                    or considered.
                  </li>
                </ul>
                <p className="mt-2 leading-relaxed text-gray-600">
                  We refer to all this information, collectively, as{" "}
                  <b>“Personal Information.”</b>We collect Personal Information
                  either directly from you, the consumer, or through observation
                  and recording of your online activities, such as through the
                  use of cookies. We are allowed to process this Personal
                  Information because you have either provided your consent to
                  the processing of this information, the processing is
                  necessary to perform a contract with you, the processing is
                  necessary in order to take steps that you have requested prior
                  to entering into a contract with us, or the processing is
                  necessary for compliance with a legal obligation.
                </p>
                <p className="mt-2 leading-relaxed text-gray-600">
                  We use Personal Information for a variety of purposes,
                  including:
                </p>
                <ul className="mt-2 leading-relaxed text-gray-600">
                  <li>
                    Auditing transactions that a consumer has entered into
                  </li>
                  <li>Creating new features</li>
                  <li>Data analytics</li>
                  <li>Debugging to identify and repair errors</li>
                  <li>Detecting security incidents</li>
                  <li>Enforcing our Terms of Service</li>
                  <li>
                    Marketing and advertising, including potentially sending
                    promotional gifts
                  </li>
                  <li>Participation in surveys</li>
                  <li>Performing services</li>
                  <li>Processing or fulfilling orders or transactions</li>
                  <li>Processing payments</li>
                  <li>
                    Protecting against malicious, deceptive, fraudulent or
                    illegal activity, and prosecuting those responsible for such
                    activities
                  </li>
                  <li>Providing customer service</li>
                  <li>Resolving disputes</li>
                  <li>Short-term transient use</li>
                  <li>Verifying customer information.</li>
                </ul>
                <p className="mt-2 leading-relaxed text-gray-600">
                  If we don’t collect or are unable to use you Personal
                  Information, we will not be able to perform the functions
                  described above. We are not required to collect Personal
                  Information by law, court order, nor by a tribunal order. We
                  do not combine nor link the Personal Information that we hold
                  about you.
                </p>
              </section>

              <section>
                <h2 className="mb-1 text-[28px] font-semibold leading-tight text-[#34373C] max-[600px]:text-[25px] min-[1024px]:text-[32px]">
                  With whom do we share your Personal Information?
                </h2>
                <ul>
                  <li className="leading-relaxed text-gray-600">
                    Advertising networks
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    Content management systems
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    Customer management systems
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    Data analytics providers
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    Email marketing vendors
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    Financial transactions processors
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    Hosting providers
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    Parties that need to operate the website
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    Shipping companies.
                  </li>
                </ul>
                <p className="mt-2 leading-relaxed text-gray-600">
                  In reasons for sharing and disclosing Personal Information
                  with such third parties are:
                </p>
                <ul className="mt-2">
                  <li className="leading-relaxed text-gray-600">
                    To analyze your interactions with us or our Website
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    To host our website
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    To manage our interactions with you
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    To market directly to you via email
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    To process transactions
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    To prevent or investigate fraud
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    To provide you with advertisements
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    To send you promotional gifts
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="min-[1024px]: mb-1 text-[28px] font-semibold leading-tight text-[#34373C] max-[600px]:text-[25px]">
                  How do we protect your personal information?
                </h2>
                <p className="mt-2 leading-relaxed text-gray-600">
                  We have implemented the following measures to protect and
                  safeguard your personal information
                </p>
                <ul className="mt-2">
                  <li className="leading-relaxed text-gray-600">
                    Limiting the amount of Personal Information that we collect
                    to only that which is necessary
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    Using ssl or other secure connection technologies when
                    receiving or sending Personal Information beyond internal
                    networks
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    Having comprehensive security policies and procedures
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    Requiring our employees to sign agreements to maintain
                    confidentiality
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    Implementing and monitoring intrusion prevention and
                    detection systems
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    Maintaining up-to-date software and safeguards
                  </li>
                  <li className="leading-relaxed text-gray-600">
                    Performing regular due diligence of vendors
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-1 text-[28px] font-semibold leading-tight text-[#34373C] max-[600px]:text-[25px] min-[1024px]:text-[32px]">
                  Sale of your information
                </h2>
                <p className="mt-2 leading-relaxed text-gray-600">
                  We do not sell your Personal Information. Please see the "Your
                  Rights" section below for more information about exercising
                  your privacy rights regarding sale of your Personal
                  Information.
                </p>
              </section>

              <section>
                <h2 className="mb-1 text-[28px] font-semibold leading-tight text-[#34373C] max-[600px]:text-[25px] min-[1024px]:text-[32px]">
                  Cookies
                </h2>
                <p className="leading-relaxed text-gray-600">
                  A cookie is information saved by your web browser. When you
                  visit a website, the site may place a cookie on your web
                  browser so it can recognize your device in the future. If you
                  return to that site later, it can read that cookie to remember
                  you from your last visit and keep track of you over time.
                </p>
                <p className="leading-relaxed text-gray-600">
                  Our Website collects the cookies identified below. We have
                  classified the cookies that we collect by the purpose that
                  they serve.
                </p>
                <p className="mt-2 leading-relaxed text-gray-600">
                  <b>“Essential cookies”</b> are cookies that are essential for
                  you to browse our Website and use its features. For example,
                  these cookies may be used for maintaining security,
                  authenticating users, and preventing fraudulent actions. These
                  cookies are enabled by default, and without them, our Website
                  may not be fully functional. This Website collects the
                  following strictly necessary/essential cookies:
                </p>
                <ul className="mt-2 leading-relaxed text-gray-600">
                  <li>
                    Provider(s) of the cookie:{" "}
                    <a
                      href="https://www.cosmedicentre.com/"
                      target="_blank"
                      className="text-[#1248a7] underline"
                    >
                      cosmedicenter.com
                    </a>
                  </li>
                  <li>
                    Purposes: Compliance with legal obligations; consent
                    storage; optimization; website security; improvement of
                    service; reducing bandwith usage.
                  </li>
                  <li>Duration: perpetual.</li>
                </ul>
                <p className="mt-2 leading-relaxed text-gray-600">
                  <b>“Functional cookies”</b> are cookies that allow a Website
                  to remember the choices that you have made in the past and how
                  you use the Website. For example, these cookies may be used
                  for remembering what language you prefer, which pages you
                  clicked on, or what your username and password are so that you
                  can automatically log in to your account. These cookies are
                  <b>
                    {" "}
                    disabled by default and will be enabled only if you grant
                    your consent to do so.
                  </b>{" "}
                  If you do provide your consent, this Website will collect the
                  following functional cookies:
                </p>
                <ul className="mt-2 leading-relaxed text-gray-600">
                  <li>
                    Provider(s) of the cookie:{" "}
                    <a
                      href="https://www.cosmedicentre.com/"
                      className="text-[#1248a7] underline"
                    >
                      cosmedicenter.com
                    </a>
                  </li>
                  <li>
                    Purposes: Increasing network performance; reducing bandwith
                    usage; functionality; browser support; providing Service;
                    answering user request; ensure security, prevent fraud, and
                    debug; fraud prevention; statistics; develop and improve
                    products; marketing; optimization; technical support.
                  </li>
                  <li>Duration: perpetual.</li>
                  <li>
                    How to opt-out: Visit the cookie provider’s websites{" "}
                    <a
                      href="https://cosmedicenter.com/"
                      className="text-[#1248a7] underline"
                    >
                      [https://cosmedicenter.com/]
                    </a>
                  </li>
                </ul>

                <p className="mt-2 leading-relaxed text-gray-600">
                  <b>“Marketing cookies”</b> are cookies that track your online
                  activity to, for example, help advertisers deliver more
                  relevant advertisements or to limit how many times you see an
                  advertisement. This Website does not collect any marketing
                  cookies.
                </p>

                <p className="mt-2 leading-relaxed text-gray-600">
                  You have certain choices when it comes to the placing of
                  cookies on your device. You may choose to accept or deny any
                  functional or marketing cookies. If you consent to the use of
                  these cookies but would then like to withdraw your consent,
                  you may do so at any time through our cookie consent tool,
                  which can be found on the Website's home page. You can control
                  your cookie choices using the following means:
                </p>
                <ul className="mt-2 leading-relaxed text-gray-600">
                  <li>
                    Through our <b>cookie consent tool</b>, where you can select
                    the categories of cookies that you allow to be placed on
                    your device and withdraw that consent; and
                  </li>
                  <li>
                    Through <b>your browser</b>, where you can instruct it to
                    delete or refuse cookies. You can visit the help center of
                    your browser, the "Tools", "Edit", or "Help" pages to set
                    your cookie preferences and delete cookies.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-1 text-[28px] font-semibold leading-tight text-[#34373C] max-[600px]:text-[25px] min-[1024px]:text-[32px]">
                  Children's privacy
                </h2>
                <p className="leading-relaxed text-gray-600">
                  This Website is intended for use by a general audience and
                  does not offer services to children. Should a child whom we
                  know to be under 18 send personal information to us, we will
                  use that information only to respond to that child to inform
                  him or her that they cannot use this Website.
                </p>
              </section>

              <section>
                <h2 className="mb-1 text-[28px] font-semibold leading-tight text-[#34373C] max-[600px]:text-[25px] min-[1024px]:text-[32px]">
                  HIPAA Privacy
                </h2>
                <p className="leading-relaxed text-gray-600">
                  Certain information may be subject to additional protections
                  under applicable federal, state or local data protection laws,
                  including the federal Health Insurance Portability and
                  Accountability Act of 1996, as amended by the Health
                  Information Technology for Economic and Clinical Health Act
                  (collectively, “HIPAA”) which governs the use and disclosure
                  of Protected Health Information, as defined by HIPAA. However,
                  <b>
                    the Personal Information that we collect through this
                    Website is not Protected Health Information, and, for such
                    purposes, we are not a HIPAA regulated entity.
                  </b>{" "}
                  Therefore, this Privacy Policy generally controls how we may
                  collect and process all Personal Information.
                </p>
                <p className="mt-2 leading-relaxed text-gray-600">
                  To the extent that a health care provider that participates in
                  the CosMediCenter program is a HIPAA “covered entity” as
                  defined under HIPAA and such provider separately creates,
                  receives, uses or discloses Protected Health Information about
                  you, such health care provider is solely responsible for
                  providing you with their HIPAA Notice of Privacy Practices and
                  following its terms. We are not responsible for how any health
                  care provider that you see uses or discloses your Protected
                  Health Information.
                </p>
              </section>

              <section>
                <h2 className="mb-1 text-[28px] font-semibold leading-tight text-[#34373C] max-[600px]:text-[25px] min-[1024px]:text-[32px]">
                  Information retention
                </h2>
                <p className="leading-relaxed text-gray-600">
                  We retain all Personal Information, commercial information and
                  Internet or other electronic activity until you are no longer
                  a customer or until you unsubscribe from our emails.
                </p>
              </section>

              <section>
                <h2 className="mb-1 text-[28px] font-semibold leading-tight text-[#34373C] max-[600px]:text-[25px] min-[1024px]:text-[32px]">
                  Direct Marketing
                </h2>
                <p className="leading-relaxed text-gray-600">
                  We use the information that we collect about you for direct
                  marketing purposes. Direct marketing is the act of selling
                  products or services directly to consumers rather than through
                  retailers. You may, at any time, request that we cease to use
                  your information for direct marketing purposes by emailing us
                  at info@cosmedicenter.com or opting out of direct marketing
                  emails by selecting “unsubscribe” on the email communication
                  you receive from us.
                </p>
              </section>
              <section>
                <h2 className="mb-2 text-[28px] font-semibold leading-tight text-[#34373C] max-[600px]:text-[25px] min-[1024px]:text-[32px]">
                  Your rights
                </h2>
                <p className="mt-2 leading-relaxed text-gray-600">
                  All visitors or users of this Website have the following
                  rights with regard to their Personal Information:
                </p>
                <ol className="mt-2 list-decimal pl-[30px] leading-relaxed text-gray-600">
                  <li>
                    The right to access the Personal Information that we have
                    collected about you.
                  </li>
                  <li>
                    The right to know what Personal Information we have
                    collected about you, including the categories of Personal
                    Information, the categories of sources from which the
                    Personal Information was collected, the business or
                    commercial purpose for collecting, selling or sharing
                    Personal Information, the categories of third parties to
                    whom we disclose the Personal Information.
                  </li>
                  <li>
                    The right to know whether your Personal Information is sold
                    or disclosed and to whom.
                  </li>
                  <li>
                    The right to say no to the sale of your Personal
                    Information.
                  </li>
                  <li>
                    The right to opt out of the sharing of your Personal
                    Information.
                  </li>
                  <li>
                    The right to request that we delete all or some of the
                    Personal Information that we have collected on you.
                  </li>
                  <li>
                    The right not to be discriminated against based upon your
                    exercise of your privacy rights.
                  </li>
                  <li>
                    The right to equal service and price, even if you exercise
                    your privacy rights.
                  </li>
                  <li>
                    The right to ask us to transmit your Personal Information
                    that we have collected on you to another provider (where
                    technically feasible).
                  </li>
                  <li>
                    The right to request that we amend any of the information
                    that we have collected about you.
                  </li>
                  <li>
                    The right to withdraw your consent to the processing of your
                    data.
                  </li>
                  <li>
                    The right to request that we restrict the processing of your
                    data.
                  </li>
                  <li>
                    The right to lodge a complaint regarding our collection,
                    sharing and processing of data with competent authorities in
                    the proper jurisdiction.
                  </li>
                  <li>
                    The right to not have to identify yourself, or of using a
                    pseudonym in certain circumstances.
                  </li>
                  <li>
                    The right to stop receiving unwanted direct marketing.
                  </li>
                  <li>
                    The right to receive the Personal Information that we hold
                    about you in a portable and, to the extent feasible, a
                    readily usable format that allows you to transmit this
                    information to another entity.
                  </li>
                  <li>
                    The right to limit the use and disclosure of your sensitive
                    Personal Information.
                  </li>
                </ol>
              </section>
              <section className="leading-relaxed text-gray-600">
                <h2 className="mb-1 text-[28px] font-semibold leading-tight text-[#34373C] max-[600px]:text-[25px] min-[1024px]:text-[32px]">
                  Exercising your rights
                </h2>
                <p className="mt-2">
                  You may exercise the rights specified above by submitting a
                  consumer request to: info@cosmedicenter.com or 233 Lafayette
                  St., Newark, NJ 07105.
                </p>
                <p className="mt-2">
                  If you use our cookie consent banner to exercise your privacy
                  rights, the opt out signal will be applied to your browser. If
                  you opt-out by contacting us as stated above, your preference
                  will be applied to your account and our databases, including
                  offline sales.
                </p>
                <p className="mt-2">
                  We will need to verify your identity prior to effectuating
                  your request. To verify your identity, you will need to
                  provide us with the following information with your request:
                </p>
                <ul className="mt-2">
                  <li>Name</li>
                  <li>Phone number</li>
                  <li>Email address</li>
                </ul>
                <p className="mt-2">
                  Please note that we may be unable to process your request if
                  you do not provide us with the above information.
                </p>
                <p className="mt-2">
                  We will respond to most consumer requests within 30 to 45 days
                  of receipt, depending upon where you reside. However, some
                  requests may take longer. We will notify you in writing if we
                  need more time to respond. We have the ability to deny your
                  request(s) if certain exceptions in the law apply. If we do
                  deny your request, we will provide you with the reasons for
                  such denial. Normally, we do not charge a fee to process or
                  respond to consumer requests. However, for residents of
                  certain states or countries, we may charge a fee if the
                  request is excessive, repetitive or manifestly unfounded.
                </p>
              </section>
              <section className="leading-relaxed text-gray-600">
                <h2 className="mb-1 text-[28px] font-semibold leading-tight text-[#34373C] max-[600px]:text-[25px] min-[1024px]:text-[32px]">
                  Complaints
                </h2>
                <p className="mt-2">
                  You have the right to lodge a complaint regarding our
                  collection, use and sharing of your Personal Information by
                  contacting us at the following contact information:
                </p>
                <div className="address mt-2">
                  <p>Daniel Di Cesare</p>
                  <p>Owner</p>
                  <p>
                    <a href="#" className="text-[#1248a7] underline">
                      info@cosmedicenter.com
                    </a>
                  </p>
                  <p>973-344-8170</p>
                  <p>233 Lafayette St., Newark, NJ 07105</p>
                </div>
                <p className="mt-2">
                  We will respond to all complaints within a reasonable time
                  (usually 30 days). This person is also acceptable and
                  responsible for our privacy practices and procedures and you
                  may lodge a privacy complaints with us by contacting such
                  person.
                </p>
                <p className="mt-2">
                  Residents of Quebec may lodge a complaint with the Office of
                  the Privacy Commissioner of Quebec by filling out{" "}
                  <a
                    href="https://www.cai.gouv.qc.ca/a-propos/nous-joindre/"
                    target="_blank"
                    className="text-[#1248a7]"
                  >
                    this Quebec Privacy Commission page
                  </a>{" "}
                  or calling 1-888-528-7741. Residents of Canada may also lodge
                  a complaint with the Office of the Privacy Commissioner of
                  Canada by visiting{" "}
                  <a
                    href="https://priv.gc.ca/en/report-a-concern/file-a-formal-privacy-complaint/file-a-complaint-about-a-business/"
                    target="_blank"
                    className="text-[#1248a7]"
                  >
                    this File a Privacy Complaint (Canada) page
                  </a>{" "}
                  or calling 1-800-282-1376.
                </p>
              </section>
              <section className="leading-relaxed text-gray-600">
                <h2 className="mb-1 text-[28px] font-semibold leading-tight text-[#34373C] max-[600px]:text-[25px] min-[1024px]:text-[32px]">
                  Location of data processing
                </h2>
                <p className="mt-2">
                  All data processing activities undertaken by us take place in
                  United States.
                </p>
              </section>
              <section className="leading-relaxed text-gray-600">
                <h2 className="mb-1 text-[28px] font-semibold leading-tight text-[#34373C] max-[600px]:text-[25px] min-[1024px]:text-[32px]">
                  Third-party websites
                </h2>
                <p className="mt-2">
                  This Website may contain hyperlinks to websites operated by
                  parties other than us. We provide such hyperlinks for your
                  reference only. We do not control such websites and are not
                  responsible for their contents or the privacy or other
                  practices of such websites. It is up to you to read and fully
                  understand their privacy policies. Our inclusion of hyperlinks
                  to such websites does not imply any endorsement of the
                  material on such websites or any association with their
                  operators.
                </p>
              </section>
              <section className="leading-relaxed text-gray-600">
                <h2 className="mb-1 text-[28px] font-semibold leading-tight text-[#34373C] max-[600px]:text-[25px] min-[1024px]:text-[32px]">
                  Do Not Track
                </h2>
                <p className="mt-2">
                  Do Not Track is a preference you can set on your browser to
                  inform websites that you do not want to be tracked. We do not
                  support Do Not Track ("DNT"). You can either enable or disable
                  Do Not Track by visiting the Preferences or Settings page of
                  your browser.
                </p>
              </section>
              <section className="leading-relaxed text-gray-600">
                <h2 className="mb-1 text-[28px] font-semibold leading-tight text-[#34373C] max-[600px]:text-[25px] min-[1024px]:text-[32px]">
                  Changes to Privacy Policy
                </h2>
                <p className="mt-2">
                  We reserve the right to amend this Privacy Policy at any time.
                  We will notify you of any changes to this Privacy Policy by
                  posting the updated Privacy Policy to this website or
                  application.
                </p>
              </section>
              <section className="leading-relaxed text-gray-600">
                <h2 className="mb-1 text-[28px] font-semibold leading-tight text-[#34373C] max-[600px]:text-[25px] min-[1024px]:text-[32px]">
                  Questions
                </h2>
                <p className="mt-2">
                  If you have any questions about this Privacy Policy, please
                  contact us at info@cosmedicenter.com.
                </p>
              </section>
            </main>
          </article>
        </div>
      </div>
    </>
  );
};

export default Privacy;
