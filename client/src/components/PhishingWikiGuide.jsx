import React, { useState } from 'react';
import './PhishingWikiGuide.css';

const PhishingWikiGuide = () => {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="wiki-container">
      <div className="wiki-header">
        <h1>Phishing (Social Engineering)</h1>
        <p className="wiki-subtitle">A comprehensive guide to understanding phishing attacks and protecting yourself</p>
      </div>

      <div className="wiki-content-wrapper">
        {/* Sidebar Navigation */}
        <div className="wiki-sidebar">
          <div className="wiki-toc">
            <h3>Contents</h3>
            <ul>
              <li><a onClick={() => setActiveSection('overview')} className={activeSection === 'overview' ? 'active' : ''}>1. Overview</a></li>
              <li><a onClick={() => setActiveSection('history')} className={activeSection === 'history' ? 'active' : ''}>2. History</a></li>
              <li><a onClick={() => setActiveSection('mechanics')} className={activeSection === 'mechanics' ? 'active' : ''}>3. How Phishing Works</a></li>
              <li><a onClick={() => setActiveSection('types')} className={activeSection === 'types' ? 'active' : ''}>4. Types of Phishing</a></li>
              <li><a onClick={() => setActiveSection('red-flags')} className={activeSection === 'red-flags' ? 'active' : ''}>5. Red Flags & Warning Signs</a></li>
              <li><a onClick={() => setActiveSection('defense')} className={activeSection === 'defense' ? 'active' : ''}>6. Defense Strategies</a></li>
              <li><a onClick={() => setActiveSection('examples')} className={activeSection === 'examples' ? 'active' : ''}>7. Real-World Examples</a></li>
              <li><a onClick={() => setActiveSection('response')} className={activeSection === 'response' ? 'active' : ''}>8. If You Get Phished</a></li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="wiki-main-content">
          
          {/* Overview */}
          {activeSection === 'overview' && (
            <div className="wiki-section">
              <h2>1. Overview</h2>
              <p><strong>Phishing</strong> is a type of social engineering attack used to steal sensitive information such as login credentials, financial data, and personal information. Attackers impersonate legitimate organizations or individuals through email, text messages, phone calls, or websites to trick users into disclosing confidential information or downloading malware.</p>
              
              <div className="wiki-infobox">
                <h4>Quick Facts</h4>
                <ul>
                  <li><strong>Primary Goal:</strong> Steal sensitive data or credentials</li>
                  <li><strong>Most Common Vector:</strong> Email (approximately 90% of attacks)</li>
                  <li><strong>Target Success Rate:</strong> 3-5% of recipients typically fall victim</li>
                  <li><strong>Median Cost Per Breach:</strong> $4.24 million (2024 data)</li>
                  <li><strong>Time to Identify:</strong> Average 200+ days for organizations</li>
                </ul>
              </div>

              <h3>Why Phishing Works</h3>
              <p>Phishing exploits human psychology rather than technical vulnerabilities. Attackers use:</p>
              <ul>
                <li><strong>Authority:</strong> Impersonating trusted companies or officials</li>
                <li><strong>Urgency:</strong> Creating artificial time pressure ("Act now or lose access")</li>
                <li><strong>Fear:</strong> Threatening account suspension, legal action, or data compromise</li>
                <li><strong>Familiarity:</strong> Using logos, language, and formatting of legitimate organizations</li>
                <li><strong>Trust:</strong> Building credibility through detailed information</li>
              </ul>
            </div>
          )}

          {/* History */}
          {activeSection === 'history' && (
            <div className="wiki-section">
              <h2>2. History of Phishing</h2>
              <p>While the term "phishing" is relatively modern, the concept of deception has existed in technology since the early days of the internet.</p>

              <h3>Evolution Timeline</h3>
              <ul>
                <li><strong>1980s-1990s:</strong> Early online impersonation attempts in chat rooms and early email systems</li>
                <li><strong>1995:</strong> First documented "phishing" attacks targeting AOL users</li>
                <li><strong>2000s:</strong> Phishing becomes a widespread cybercrime, targeting banks and financial institutions</li>
                <li><strong>2010s:</strong> Spear phishing and targeted attacks increase; whaling targets senior executives</li>
                <li><strong>2020s:</strong> AI-enhanced phishing, deepfakes, and sophisticated business email compromise attacks</li>
              </ul>

              <h3>Modern Phishing Landscape</h3>
              <p>Today, phishing attacks are highly sophisticated, targeting specific individuals with research-backed messages. Attackers use:</p>
              <ul>
                <li>LinkedIn profiling to gather personal information</li>
                <li>Company website data to understand organizational structure</li>
                <li>Social media to identify relationships and interests</li>
                <li>Dark web tools to automate and scale attacks</li>
              </ul>
            </div>
          )}

          {/* How Phishing Works */}
          {activeSection === 'mechanics' && (
            <div className="wiki-section">
              <h2>3. How Phishing Works</h2>
              <p>Understanding the phishing attack chain helps you identify and prevent these attacks.</p>

              <h3>The Phishing Attack Chain</h3>
              <ol>
                <li><strong>Reconnaissance:</strong> Attacker researches target organization and employees</li>
                <li><strong>Crafting:</strong> Attacker creates convincing impersonation emails/websites</li>
                <li><strong>Distribution:</strong> Attacker sends mass or targeted phishing messages</li>
                <li><strong>Victim Interaction:</strong> User clicks link, downloads attachment, or replies with information</li>
                <li><strong>Data Harvesting:</strong> Credentials, personal data, or malware captured</li>
                <li><strong>Exploitation:</strong> Attacker uses stolen credentials or malware to access systems</li>
              </ol>

              <h3>Example Attack Scenario</h3>
              <p><em>A user receives an email appearing to be from their bank, stating "Unusual activity detected on your account. Click here to verify your identity." The link leads to a fake website that looks identical to the real bank site. When the user enters their credentials, the attacker captures them and gains access to the real bank account.</em></p>

              <div className="wiki-warning">
                <strong>⚠️ Key Point:</strong> Even secure, tech-savvy people can fall for phishing because it exploits trust and psychology, not technical weaknesses.
              </div>
            </div>
          )}

          {/* Types */}
          {activeSection === 'types' && (
            <div className="wiki-section">
              <h2>4. Types of Phishing Attacks</h2>

              <h3>Email Phishing (Mass)</h3>
              <p>Bulk emails sent to thousands of targets hoping a small percentage will respond. These are typically generic and use common tactics like urgency or threats.</p>

              <h3>Spear Phishing (Targeted)</h3>
              <p>Highly personalized attacks targeting specific individuals or organizations. Attackers research their targets extensively.</p>

              <h3>Whaling</h3>
              <p>Targeted attacks on senior executives and high-value targets. Often involves CEO impersonation requesting wire transfers or sensitive data.</p>

              <h3>Clone Phishing</h3>
              <p>Attacker duplicates a previously sent legitimate email and modifies links or attachments to malicious versions. The victim may recognize the original sender, making it more believable.</p>

              <h3>Business Email Compromise (BEC)</h3>
              <p>Attacker compromises or spoofs a business email account to request fraudulent transfers or sensitive information from employees who trust internal communications.</p>

              <h3>Vishing (Voice Phishing)</h3>
              <p>Phishing conducted over the phone. Attacker impersonates a legitimate entity and tricks victim into revealing sensitive information.</p>

              <h3>Smishing (SMS Phishing)</h3>
              <p>Phishing via text message. Often includes urgent messages with links to malicious websites or requests to confirm personal information.</p>

              <h3>Pharming</h3>
              <p>Redirecting users to fake websites through DNS poisoning or malware. User visits what they believe is a legitimate URL but ends up on attacker's fake site.</p>
            </div>
          )}

          {/* Red Flags */}
          {activeSection === 'red-flags' && (
            <div className="wiki-section">
              <h2>5. Red Flags & Warning Signs</h2>
              <p>Learning to spot these warning signs is your primary defense against phishing.</p>

              <h3>Sender Information Red Flags</h3>
              <ul>
                <li><strong>Domain Mismatch:</strong> Email claims to be from "support@amazon.com" but actual sender is "support@amazon-secure.net" or similar. Look at the actual email address, not just the display name.</li>
                <li><strong>Generic Greetings:</strong> "Dear Customer" or "Dear User" instead of your actual name (though personalized greetings can also be phishing)</li>
                <li><strong>Suspicious Domain Extensions:</strong> Legitimate companies use standard domains (.com, .org). Suspicious domains might use different TLDs or misspelled variations</li>
                <li><strong>Example:</strong> <em>An email appears to be from your bank (maybank) but the sender domain is "maybank3-alert.com" or similar variation</em></li>
              </ul>

              <h3>Content Red Flags</h3>
              <ul>
                <li><strong>Urgency & Threats:</strong> "Action required within 24 hours," "Your account will be closed," "Verify immediately to avoid suspension"</li>
                <li><strong>Requests for Credentials:</strong> No legitimate company asks for passwords, PINs, credit card numbers, or social security numbers via email</li>
                <li><strong>Suspicious Attachments:</strong> .exe, .zip, or .scr files are common malware vectors. Office files with macros enabled are also risky</li>
                <li><strong>Poor Grammar/Spelling:</strong> Many phishing emails contain obvious spelling or grammar errors</li>
                <li><strong>Generic Content:</strong> Messages that could apply to any user rather than specific to your account</li>
                <li><strong>Example:</strong> <em>An email threatens "Your Amazon account has been compromised. Click here to verify your identity NOW or your account will be permanently closed in 24 hours"</em></li>
              </ul>

              <h3>Link & URL Red Flags</h3>
              <ul>
                <li><strong>Link Text vs. Actual URL:</strong> Hover over links. If the displayed text says "amazon.com" but the actual URL is different, it's phishing</li>
                <li><strong>Suspicious URLs:</strong> "http://" instead of "https://", numbers instead of letters (amaz0n.com), extra dots or dashes</li>
                <li><strong>Shortened URLs:</strong> Links like "bit.ly/abc123" hide the actual destination</li>
                <li><strong>Unusual Ports:</strong> URLs with non-standard ports like "amazon.com:8080" are suspicious</li>
                <li><strong>Example:</strong> <em>Email displays "Click here to verify your Maybank account" but hovering reveals the link goes to "maybank3-alert.com"</em></li>
              </ul>

              <h3>Request Pattern Red Flags</h3>
              <ul>
                <li><strong>Unexpected Requests:</strong> Email requests information you weren't asked to provide</li>
                <li><strong>Verification Requests:</strong> "Verify your information," "Confirm your identity," "Update your profile"</li>
                <li><strong>Financial Requests:</strong> Asking for wire transfers, payment updates, or banking details</li>
                <li><strong>Attachment Installation:</strong> "Download this security update," "Install this patch," "Open this document"</li>
                <li><strong>Example:</strong> <em>Email claims a security update is required and asks you to download and run an .exe file (which would actually install malware)</em></li>
              </ul>

              <h3>Design & Branding Red Flags</h3>
              <ul>
                <li><strong>Logo Quality:</strong> Pixelated, blurry, or incorrectly sized logos</li>
                <li><strong>Inconsistent Branding:</strong> Colors, fonts, or layouts don't match the legitimate company's standard</li>
                <li><strong>Unusual Formatting:</strong> Too many exclamation marks, ALL CAPS text, or strange layouts</li>
                <li><strong>Missing Information:</strong> No company phone number, address, or legitimate contact information</li>
              </ul>

              <div className="wiki-checklist">
                <h4>Quick Phishing Checklist</h4>
                <ul>
                  <li>☐ Does the sender's email address match the company domain?</li>
                  <li>☐ Does the message use urgency or threats?</li>
                  <li>☐ Does it ask for sensitive information?</li>
                  <li>☐ Do the links go where they claim to go?</li>
                  <li>☐ Does it have suspicious attachments?</li>
                  <li>☐ Is the grammar and spelling correct?</li>
                  <li>☐ Is this something I actually ordered or requested?</li>
                </ul>
              </div>
            </div>
          )}

          {/* Defense Strategies */}
          {activeSection === 'defense' && (
            <div className="wiki-section">
              <h2>6. Defense Strategies</h2>

              <h3>Email Security Best Practices</h3>
              <ul>
                <li><strong>Verify the Sender:</strong> Always check the actual sender email address, not just the display name. Hover over links to see their real destination</li>
                <li><strong>Don't Click Suspicious Links:</strong> When in doubt, manually type the company website into your browser instead of clicking email links</li>
                <li><strong>Check for HTTPS:</strong> Legitimate financial and secure websites use https:// (not http://)</li>
                <li><strong>Use Email Filters:</strong> Enable spam and phishing filters. Most email providers (Gmail, Outlook) have built-in detection</li>
                <li><strong>Create Email Rules:</strong> Set up rules to automatically flag emails from suspicious domains or containing certain keywords</li>
              </ul>

              <h3>Authentication & Access Control</h3>
              <ul>
                <li><strong>Enable Multi-Factor Authentication (MFA):</strong> Even if your password is compromised, MFA prevents account access without a second factor (app, text, biometric)</li>
                <li><strong>Use Strong Passwords:</strong> Complex, unique passwords for each account make credential stuffing less effective</li>
                <li><strong>Password Managers:</strong> Tools like 1Password or Bitwarden auto-fill only on legitimate sites, reducing credential entry on fake sites</li>
                <li><strong>Regular Password Changes:</strong> Change passwords if you suspect a breach</li>
              </ul>

              <h3>Technical Defenses</h3>
              <ul>
                <li><strong>Keep Software Updated:</strong> Security patches fix vulnerabilities that phishing could exploit</li>
                <li><strong>Use Antivirus Software:</strong> Protects against malware that phishing emails might contain</li>
                <li><strong>Browser Security Extensions:</strong> Extensions like uBlock Origin or similar can block malicious sites</li>
                <li><strong>DNS Filtering:</strong> Services like Cloudflare's 1.1.1.1 or Quad9 can block access to known phishing domains</li>
              </ul>

              <h3>Organizational Defenses</h3>
              <ul>
                <li><strong>User Training:</strong> Regular phishing awareness training significantly reduces successful attacks</li>
                <li><strong>Phishing Simulations:</strong> Companies conduct fake phishing tests to identify vulnerable employees</li>
                <li><strong>Email Authentication:</strong> SPF, DKIM, and DMARC protocols verify sender authenticity and prevent domain spoofing</li>
                <li><strong>Access Controls:</strong> Implement principle of least privilege - users only have access they need</li>
              </ul>

              <h3>Behavioral Defense</h3>
              <ul>
                <li><strong>Maintain Healthy Skepticism:</strong> Assume emails could be phishing, especially if they ask for action</li>
                <li><strong>Use Out-of-Band Verification:</strong> If an email asks you to verify something, call the company using a phone number from their official website</li>
                <li><strong>Think Before You Click:</strong> "Is this something I'm expecting? Does this make sense?"</li>
                <li><strong>Report Suspicious Emails:</strong> Forward phishing attempts to your IT department or the company being impersonated</li>
              </ul>
            </div>
          )}

          {/* Real-World Examples */}
          {activeSection === 'examples' && (
            <div className="wiki-section">
              <h2>7. Real-World Examples</h2>

              <h3>Example 1: Fake Security Update (Malware Distribution)</h3>
              <div className="wiki-example">
                <p><strong>Scenario:</strong> User receives email from "support@microsoft-updates.net" claiming critical Windows security update is required.</p>
                <p><strong>Red Flags:</strong></p>
                <ul>
                  <li>Domain is "microsoft-updates.net" NOT official "microsoft.com"</li>
                  <li>Creates urgency: "Action required immediately"</li>
                  <li>Threatens consequences: "System will be compromised in 24 hours"</li>
                  <li>Requests download of .exe file - common malware vector</li>
                  <li>Uses fear tactics about data theft and financial loss</li>
                </ul>
                <p><strong>Why It Works:</strong> Security updates are legitimate and frequent. Users expect them. The email exploits this familiarity and creates fear about potential compromise.</p>
                <p><strong>What Should Happen:</strong> Real Microsoft updates come through Windows Update, not email. Never download security patches from unsolicited emails. Go directly to microsoft.com to verify.</p>
              </div>

              <h3>Example 2: Fake Delivery Notification (Data Harvest)</h3>
              <div className="wiki-example">
                <p><strong>Scenario:</strong> User receives email from "delivery@fedex-package-trace.com" about failed package delivery, requesting personal information.</p>
                <p><strong>Red Flags:</strong></p>
                <ul>
                  <li>Domain is "fedex-package-trace.com" NOT official "fedex.com"</li>
                  <li>User likely has received packages and doesn't immediately recognize this as suspicious</li>
                  <li>Creates urgency: "Package will be returned in 3 days"</li>
                  <li>Requests personal information: name, address, phone, email</li>
                  <li>Link displays "fedex.com" but actually goes to spoofed domain</li>
                </ul>
                <p><strong>Why It Works:</strong> People expect delivery notifications. The attacker uses this against them. The 3-day deadline creates pressure to act quickly without thinking.</p>
                <p><strong>What Should Happen:</strong> Always go directly to fedex.com (or use FedEx app) to track packages. Never click email links for deliveries. Hover over links to verify actual destination.</p>
              </div>

              <h3>Example 3: Fake Account Compromise (Credential Theft)</h3>
              <div className="wiki-example">
                <p><strong>Scenario:</strong> User receives email from "security-alert@amaz0n-account.com" claiming account is compromised and requesting urgent verification.</p>
                <p><strong>Red Flags:</strong></p>
                <ul>
                  <li>Domain uses "amaz0n" with ZERO instead of letter O (amaz0n-account.com NOT amazon.com)</li>
                  <li>Creates fear: "Account has been compromised," "Account suspended"</li>
                  <li>Requests highly sensitive data: password, credit card, CVV, full name, date of birth</li>
                  <li>Uses urgency: "24-hour deadline or permanent closure"</li>
                  <li>Requests ALL personal and financial information at once</li>
                </ul>
                <p><strong>Why It Works:</strong> Account compromise is a real fear. Users act quickly when they believe their accounts are at risk. The attacker requests everything in one go hoping to collect complete identity theft information.</p>
                <p><strong>What Should Happen:</strong> Amazon (or any legitimate company) NEVER requests passwords or full credit card info via email. Always go directly to amazon.com to check your account. Real security alerts never ask for sensitive data in email.</p>
              </div>

              <h3>Example 4: Banking Alert (Link Spoofing)</h3>
              <div className="wiki-example">
                <p><strong>Scenario:</strong> User receives email from "account-security@maybank3-alert.com" about unusual banking activity, with link appearing to go to maybank.com.</p>
                <p><strong>Red Flags:</strong></p>
                <ul>
                  <li>Sender domain (maybank3-alert.com) is not official banking domain</li>
                  <li>Link displays as "maybank.com" but when you hover, actual URL is different domain</li>
                  <li>Creates urgency: "Verify within 12 hours"</li>
                  <li>Threatens consequences: "Account suspension," "Permanent closure," "Blocked access to funds"</li>
                  <li>Requests sensitive banking credentials: username, password, PIN</li>
                </ul>
                <p><strong>Why It Works:</strong> Link spoofing is particularly effective because the displayed text says "maybank.com" (which looks legitimate) but the actual destination is different. Many users never hover to check the real URL.</p>
                <p><strong>What Should Happen:</strong> ALWAYS hover over links in banking emails before clicking. Banks never request PINs or passwords via email. For banking alerts, manually navigate to your bank's website or call their official number.</p>
              </div>
            </div>
          )}

          {/* Response */}
          {activeSection === 'response' && (
            <div className="wiki-section">
              <h2>8. If You Get Phished</h2>

              <h3>Immediate Actions</h3>
              <ol>
                <li><strong>Don't Panic:</strong> Take a deep breath. Many people fall for phishing. You're not alone.</li>
                <li><strong>Stop Using the Account:</strong> If you entered credentials, stop using that account immediately</li>
                <li><strong>Change Your Password:</strong> From a different device, change the password immediately using the official website</li>
                <li><strong>Report It:</strong> Report to the company being impersonated and to your IT security team</li>
                <li><strong>Monitor Accounts:</strong> Watch for fraudulent activity for the next 30-90 days</li>
              </ol>

              <h3>If You Clicked a Link But Didn't Enter Information</h3>
              <ul>
                <li>Close the browser window</li>
                <li>Run a malware scan on your computer</li>
                <li>Check for suspicious installations or changes</li>
                <li>You're likely safe but should monitor for any unusual activity</li>
              </ul>

              <h3>If You Downloaded an Attachment</h3>
              <ul>
                <li>Don't open the file</li>
                <li>Move it to quarantine/trash</li>
                <li>Run a full antivirus scan</li>
                <li>Contact IT security immediately</li>
                <li>Consider professional assistance if your system is compromised</li>
              </ul>

              <h3>If You Entered Credentials</h3>
              <ul>
                <li><strong>Change Your Password:</strong> From a different device, immediately change the password for that account</li>
                <li><strong>Enable MFA:</strong> If available, enable multi-factor authentication</li>
                <li><strong>Check Account Activity:</strong> Review recent logins and connected devices</li>
                <li><strong>Check Other Accounts:</strong> If you reuse passwords, change those too</li>
                <li><strong>Notify Financial Institutions:</strong> If banking/payment info was compromised, contact your bank</li>
                <li><strong>Monitor Credit Reports:</strong> Consider freezing your credit at the three major bureaus (Equifax, Experian, TransUnion)</li>
              </ul>

              <h3>If Financial Information Was Compromised</h3>
              <ul>
                <li><strong>Contact Your Bank:</strong> Immediately notify your financial institution</li>
                <li><strong>Review Transactions:</strong> Check for any unauthorized charges</li>
                <li><strong>File a Report:</strong> File a report with the Federal Trade Commission at reportfraud.ftc.gov</li>
                <li><strong>Credit Monitoring:</strong> Consider credit monitoring service or credit freeze</li>
                <li><strong>Identity Theft Protection:</strong> Services like LifeLock or similar can monitor for misuse of your identity</li>
              </ul>

              <h3>Workplace Response</h3>
              <ul>
                <li><strong>Notify IT Security:</strong> Immediately report to your IT or security team</li>
                <li><strong>Don't Delete the Email:</strong> Keep it as evidence</li>
                <li><strong>Follow Company Protocol:</strong> Your organization may have specific incident response procedures</li>
                <li><strong>Change Workplace Passwords:</strong> Change credentials for work systems from a different device</li>
                <li><strong>Accept Security Training:</strong> Your company may require additional phishing awareness training</li>
              </ul>

              <div className="wiki-highlight">
                <strong>Remember:</strong> Reporting phishing helps protect others. When you report suspicious emails to the company being impersonated, you help them shut down the attack infrastructure.
              </div>
            </div>
          )}

        </div>
      </div>

      <div className="wiki-footer">
        <p className="wiki-disclaimer">
          <strong>Disclaimer:</strong> This guide is for educational purposes to increase phishing awareness. It is not a substitute for professional security advice. 
          If you believe you have fallen victim to phishing or cybercrime, contact law enforcement or a cybersecurity professional immediately.
        </p>
      </div>
    </div>
  );
};

export default PhishingWikiGuide;
