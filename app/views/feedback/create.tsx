import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import feedback, { type FeedbackValidation } from "~/api/feedback";
import ShowError from "~/components/showError";

export default function CreateFeedback() {
  const [message, setMessage] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [error, setError] = useState<FeedbackValidation | null>(null);
  const navigation = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await feedback.create({
      Comment: message,
      Rating: String(rating),
    });

    if (result.status === 201) {
      navigation("/profile");
      return;
    }
    setError(result.error as unknown as FeedbackValidation);
  };

  return (
    <section className="mx-4 catalog profile">
      <a href="/">
        <img src="/img/arrow-left.png" alt="Назад" className="my-2 myImgArrow" />
      </a>
      <div className="text-center">
        <h1>Оставить отзыв</h1>
      </div>
      <div className="myInfoCard catalog addProduct d-flex align-items-center justify-content-center">
        <div className="mb-3 w-100" style={{ maxWidth: "500px" }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="d-flex justify-content-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{
                      cursor: "pointer",
                      fontSize: "2rem",
                      color: star <= rating ? "orange" : "#ccc",
                    }}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <ShowError errorKey="Rating" error={error} />
            </div>

            <div className="mb-3">
              <textarea
                name="message"
                placeholder="Комментарий"
                rows={6}
                className="border-0 rounded-4 backColorGre1 w-100 px-3 py-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <ShowError errorKey="Comment" error={error} />
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="w-50 myButton rounded-4 myBlue text-white p-2">
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}