# Backend API Documentation

This repository contains the backend API for the application. It provides endpoints for user authentication, menu management, order placement, and more.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Install the dependencies: `pip install -r requirements.txt`

## Usage

1. Start the Flask server: `python app.py`
2. Access the API endpoints using a REST client or web browser.

## Endpoints

- `GET /`: Returns a "Hello, World!" message.
- `POST /signup`: Registers a new user.
- `POST /login`: Authenticates a user and generates a JWT token.
- `GET /protected`: Returns a protected resource that requires authentication.
- `GET /menu`: Returns the list of menu items.
- `POST /add_dish`: Adds a new dish to the menu.
- `DELETE /remove_dish/<dish_id>`: Removes a dish from the menu.
- `PATCH /update_dish/<dish_id>`: Updates the details of a dish.
- `POST /order`: Places an order.
- `PATCH /update_order/<order_id>`: Updates the status of an order.
- `GET /order_history`: Returns the order history for a user.
- `GET /all_orders`: Returns all orders (admin access only).
- `POST /bot`: Sends a message to the bot (authenticated users only).

## License

This project is licensed under the [MIT License](LICENSE).
