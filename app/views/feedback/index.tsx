import type { Route } from "./+types/index";
import feedback from "~/api/feedback";
import AdaptivePaginator from "~/components/AdaptivePaginator";
import Loader from "~/components/Loader";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import default_image_url from "~/constants/image";
import FeedbackCard from "~/components/FeedbackCard";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const feedbacks = await feedback.getAllWithPaginate(page);
  return feedbacks;
}

export default function CommentsView({ loaderData }: Route.ComponentProps) {
  const [feedbacks, setFeedbacks] = useState(loaderData);
  const [load, setLoad] = useState(false);
  const [searchParams] = useSearchParams();

  const getData = async () => {
    const page = searchParams.get("page") || "1";

    feedback.getAllWithPaginate(parseInt(page)).then((result) => {
      setFeedbacks(result);
      setLoad(false);
    });
  };
  useEffect(() => {
    setLoad(true);
    getData();
  }, [searchParams]);

  if (load) {
    return <Loader />;
  }

  //   const formatDate = (dateString: string) => {
  //     const date = new Date(dateString);
  //     return date.toLocaleDateString("ru-RU", {
  //       day: "numeric",
  //       month: "long",
  //       year: "numeric",
  //     });
  //   };

  const destroyFeedback = async (idFeedback:  string) => {
    const result = await feedback.destroy(String(idFeedback));
    getData();
  };

  const callbacks = {
    delete: destroyFeedback,
  };

  return (
    <div className="reviews content">
      <section className="m-5 reviews">
        <h1>Отзывы наших клиентов</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 my-3">
          {feedbacks?.items.map((item) => (
            <FeedbackCard props={item} key={item.id} callbacks={callbacks} />
          ))}
        </div>

        {feedbacks && feedbacks.pageCount > 1 && (
          <div className="d-flex justify-content-center mt-5">
            <AdaptivePaginator
              page={feedbacks.page}
              pageCount={feedbacks.pageCount}
            />
          </div>
        )}
      </section>
    </div>
  );
}
