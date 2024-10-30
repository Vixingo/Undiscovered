import React from "react";
import "./Section12.css";
import Accordion from "react-bootstrap/Accordion";

const Section12 = () => {
  const FAQDAta = [
    {
      id: "1",
      Qusation: " What is the PRO Elite Membership?",
      Answer:
        "The PRO Elite Membership offers a dedicated Recruiting Analyst who manages all recruitment tasks for you, including personalized guidance and strategy sessions.",
    },
    {
      id: "2",
      Qusation: "How does the PRO Elite Membership differ from other packages?",
      Answer:
        " The PRO Elite Membership includes complete recruitment management by a dedicated Analyst, whereas other packages provide limited support and require more self-management.",
    },
    {
      id: "3",
      Qusation: " How do I create a profile?",
      Answer:
        " Create your profile by selecting a membership package and completing the registration process on our platform.",
    },
    {
      id: "4",
      Qusation: "How do I upload my highlight video?",
      Answer:
        " Upload your highlight video by providing a YouTube or Hudl link in your profile settings or by uploading the video file directly if supported.",
    },
    {
      id: "5",
      Qusation: " How can I update my profile information?",
      Answer:
        "Update your profile by logging into your account and editing your profile details, including achievements, stats, and media.",
    },
    {
      id: "6",
      Qusation: "How do I select a membership package?",
      Answer:
        "Choose a membership package by navigating to our pricing page, selecting your preferred option, and completing the purchase process.",
    },
    {
      id: "7",
      Qusation: "How do I access my strategy sessions?",
      Answer:
        " For PRO Elite members, strategy sessions are scheduled directly with your Recruiting Analyst. Follow the instructions provided to book these sessions.",
    },
    {
      id: "8",
      Qusation: "How do I share my profile with college coaches?",
      Answer:
        "Share your completed profile by sending the profile link to college coaches or using membership features designed for direct contact.",
    },
    {
      id: "9",
      Qusation: "What if I have additional questions or need support?",
      Answer:
        " Contact our customer service team for any additional questions or support regarding your membership or profile.",
    },
    {
      id: "10",
      Qusation:
        "How long does it take to complete my profile and receive additional features?",
      Answer:
        "Profile completion and additional features like scouting reports or news articles typically take 24-48 hours after submission.",
    },
    {
      id: "11",
      Qusation: "Can I cancel or modify my membership?",
      Answer:
        "Yes, you can cancel or modify your membership by contacting our customer service team. Review the terms for cancellation policies.",
    },
    {
      id: "12",
      Qusation:
        "How will I be notified about updates or new features in my membership?",
      Answer:
        " Notifications about updates or new features will be sent to your email. Check your email regularly for important information.",
    },
    {
      id: "13",
      Qusation:
        "What if I want to request a personalized feature or have specific needs?",
      Answer:
        " Contact our support team with any specific requests or needs. We aim to accommodate special requirements whenever possible.",
    },
    {
      id: "14",
      Qusation: "How can I contact my Recruiting Analyst?",
      Answer:
        " PRO Elite members can contact their Recruiting Analyst through the messaging system in their account or via contact details provided during sessions.",
    },
    {
      id: "15",
      Qusation: " How does the direct coach contact feature work?",
      Answer:
        "For the PRO Elite Membership, our team handles direct coach contact on your behalf, ensuring your profile is actively presented and communicated to college coaches.",
    },
    {
      id: "16",
      Qusation:
        "Are there any additional costs or fees associated with membership?",
      Answer:
        "All costs and fees for each membership package are detailed on our pricing page. There should be no hidden fees beyond the stated cost.",
    },
    {
      id: "17",
      Qusation: "When does the mobile app launch?",
      Answer:
        "The mobile app will be launching in 64 days! Please submit your email to receive updates on our new basketball recruiting app connecting players with coaches.",
    },
  ];
  return (
    <div className="main_sec12_div mb-7">


      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>





      <h2>Frequently Ask Questions</h2>
      <div className="div_of_FAQs">
        <Accordion className="main_accodion">
          {FAQDAta?.map((item, index) => {
            return (
              <Accordion.Item
                className="Accordion_Item"
                eventKey={index}
                key={index}>
                <Accordion.Header className="Accordion_Header">
                  {item.Qusation}
                </Accordion.Header>
                <Accordion.Body>{item.Answer}</Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default Section12;
