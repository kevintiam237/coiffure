export const sendContactMessage = async (data) => {
  const response = await fetch("http://localhost:3005/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erreur lors de l’envoi du message");
  }
};