import smtplib
import email
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.utils import COMMASPACE, formatdate

class Regmail(object):
    def __init__(self,send_to):
        self.send_to = send_to
        
    def send(self):
        gmail_user = 'boysthollie@gmail.com'
        gmail_password = 'hawaibrahB1a1@$$'

        sent_from = gmail_user
        to = self.send_to
        subject = 'OMG Super Important Message'
        body = 'sent from  funboo please click on the link to activate you account'
        
        message = MIMEMultipart("alternative")
        message["Subject"] = "just registered  please click on the link to activate your Funboo account"
        message["From"] =   gmail_user
        message["To"] =     to
        
        # Create the plain-text and HTML version of your message
        text = """\
        Hi,
        How are you?
        Real Python has many great tutorials:
        www.realpython.com"""
        html = """\
        <html>
          <body>
            <p>Hi,<br>
               click the link  to activate you account<br>
               <a href="http://127.0.0.1:9000/activate">activate</a> 
               has many great tutorials.
            </p>
          </body>
        </html>
        """
        
        # Turn these into plain/html MIMEText objects
        part1 = MIMEText(text, "plain")
        part2 = MIMEText(html, "html")
        
        # Add HTML/plain-text parts to MIMEMultipart message
        # The email client will try to render the last part first
        message.attach(part1)
        message.attach(part2)
        
        email_text = """\
        From: %s
        To: %s
        Subject: %s

        %s
        """ % (sent_from, ", ".join(to), subject, body)

        try:
            server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
            server.ehlo()
            server.login(gmail_user, gmail_password)
            server.sendmail(sent_from, to, message.as_string())
            server.close()

            print("Email sent!")
        except:
            print('Something went wrong...')
            