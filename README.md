# Mailer

This repository contains a Mailer application that allows you to send emails programmatically.

## Features

- Send emails to one or multiple recipients.
- Customize the email subject and body.
- Include attachments in your emails.
- Supports both plain text and HTML email formats.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/mailer.git
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

## Usage

1. Import the Mailer module:

    ```javascript
    const Mailer = require('./path/to/mailer');
    ```

2. Create a new instance of the Mailer class:

    ```javascript
    const mailer = new Mailer();
    ```

3. Set the email details:

    ```javascript
    mailer.setRecipient('recipient@example.com');
    mailer.setSubject('Hello from Mailer!');
    mailer.setBody('This is the content of the email.');
    ```

4. (Optional) Attach files to the email:

    ```javascript
    mailer.attachFile('./path/to/file1.txt');
    mailer.attachFile('./path/to/file2.jpg');
    ```

5. Send the email:

    ```javascript
    mailer.send();
    ```

## Configuration

You can configure the Mailer application by modifying the `config.js` file. This file contains settings such as the SMTP server details, email sender information, and other options.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.