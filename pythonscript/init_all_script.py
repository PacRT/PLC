import subprocess
subprocess.call(['python', 'confirmemail.py']) # Just run the program
subprocess.check_output(['python', 'confirmemail.py']) # Also gets you the stdout

subprocess.call(['python', 'createUserVmail.py']) # Just run the program
subprocess.check_output(['python', 'createUserVmail.py']) # Also gets you the stdout

subprocess.call(['python', 'forwardPackage.py']) # Just run the program
subprocess.check_output(['python', 'forwardPackage.py']) # Also gets you the stdout

subprocess.call(['python', 'mailwatcher.py']) # Just run the program
subprocess.check_output(['python', 'mailwatcher.py']) # Also gets you the stdout

subprocess.call(['python', 'add_package.py']) # Just run the program
subprocess.check_output(['python', 'add_package.py']) # Also gets you the stdout
