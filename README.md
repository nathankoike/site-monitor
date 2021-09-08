# site-monitor

a small script to monitor a website for changes

this script needs a config.json file that uses the following information:

url => the URL that you would like to monitor

regex => the regular expression you would like to match on the website

targetEmail => the email address at which you would like to receive a
notification

applicationEmail => a gmail address with its security features disabled to allow
the script to log in and use it to send an email

applicationPass => the password to the gmail account that the application uses
