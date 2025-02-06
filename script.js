// Sample Data for Tools
const tools = [
    { name: "Drill", price: 10, available: true },
    { name: "Hammer", price: 5, available: true },
    { name: "Wrench", price: 7, available: true },
    { name: "Saw", price: 15, available: false },
];

// Display Tools
const toolContainer = document.getElementById("tool-container");
tools.forEach(tool => {
    const toolCard = document.createElement("div");
    toolCard.className = "tool-card";
    toolCard.innerHTML = `
        <h3>${tool.name}</h3>
        <p>Price: $${tool.price}/day</p>
        <p>${tool.available ? "Available" : "Not Available"}</p>
    `;
    toolContainer.appendChild(toolCard);
});

// Handle Rental Form Submission
const rentalForm = document.getElementById("rentalForm");
const errorMessage = document.getElementById("error-message");
const confirmationDetails = document.getElementById("confirmation-details");

rentalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const toolName = document.getElementById("toolName").value;
    const rentalDays = parseInt(document.getElementById("rentalDays").value);
    const userEmail = document.getElementById("userEmail").value;

    // Input Validation
    if (!toolName || !rentalDays || !userEmail) {
        errorMessage.textContent = "Please fill out all fields.";
        return;
    }

    const selectedTool = tools.find(tool => tool.name.toLowerCase() === toolName.toLowerCase());

    if (!selectedTool) {
        errorMessage.textContent = "Tool not found.";
        return;
    }

    if (!selectedTool.available) {
        errorMessage.textContent = "This tool is not available for rent.";
        return;
    }

    if (rentalDays < 1) {
        errorMessage.textContent = "Please enter a valid number of days.";
        return;
    }

    // Clear Error Message
    errorMessage.textContent = "";

    // Display Confirmation
    const totalCost = selectedTool.price * rentalDays;
    confirmationDetails.innerHTML = `
        <h3>Rental Confirmation</h3>
        <p>Tool: ${selectedTool.name}</p>
        <p>Days: ${rentalDays}</p>
        <p>Total Cost: $${totalCost}</p>
        <p>Confirmation will be sent to: ${userEmail}</p>
    `;

    // Reset Form
    rentalForm.reset();
});