import { useContext } from "react";
import { Button } from "react-bootstrap";
import type {
  FeedbackResponse,
  FeedbackResponseWithPagination,
} from "~/api/feedback";
import feedback from "~/api/feedback";
import default_image_url from "~/constants/image";
import UserContext from "~/context/UserContext";

export interface FeedbackCardProps {
  delete: (idFeedback:  string) => Promise<void>;
}

export default function FeedbackCard({
  props,
  callbacks,
}: {
  props: FeedbackResponse;
  callbacks: FeedbackCardProps;
}) {
  const { user } = useContext(UserContext);
  const renderStars = (rating: string) => {
    const stars = [];
    const ratingNum = parseInt(rating) || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= ratingNum ? "orange" : "#ccc" }}>
          &#9733;
        </span>,
      );
    }
    return stars;
  };

  return (
    <div className="col d-flex" key={props.id}>
      <div className="rounded shadow p-4 w-100 bg-white">
        <div className="d-flex align-items-center gap-3 mb-3">
          <img
            src={props.user.avatarUrl || default_image_url}
            alt={props.user.fullname}
            className="rounded-circle object-fit"
            width="60"
            height="60"
          />
          <div>
            <h5 className="mb-0">{props.user.fullname}</h5>
            <div className="text-warning">{renderStars(props.raiting)}</div>
          </div>
          {user && user.role == "Admin" && (
            <>
              <div className="mb-3">
                <Button
                  variant="danger"
                  onClick={() => callbacks.delete(props.id)}
                >
                  Удалить
                </Button>
              </div>
            </>
          )}
        </div>
        <p className="mb-0 text-secondary">{props.comment}</p>
      </div>
    </div>
  );
}
