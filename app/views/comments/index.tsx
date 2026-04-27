export default function CommentsView() {
    return (
        <div className="reviews content">
    <section className="m-5 reviews">
        <h1>Отзывы наших клиентов</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 my-3">
            {/* <!-- отзыв 1 --> */}
            <div className="col d-flex">
                <div className="rounded shadow p-4 w-100 bg-white">
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <img src="img/f" alt="avatar" className="rounded-circle object-fit" width="60" height="60"  />
                        <div>
                            <h5 className="mb-0">Анна Иванова</h5>
                            <div className="text-warning">
                                <span>★★★★★</span>
                            </div>
                        </div>
                    </div>
                    <p className="mb-0 text-secondary">Отличный сервис! Всё сделали быстро и качественно. Обязательно обращусь ещё раз.</p>
                    <small className="text-muted d-block mt-2">15 марта 2025</small>
                </div>
            </div>

            <div className="col d-flex">
                <div className="rounded shadow p-4 w-100 bg-white">
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <img src="img/avatar2.png" alt="avatar" className="rounded-circle object-fit" width="60" height="60"  />
                        <div>
                            <h5 className="mb-0">Дмитрий Петров</h5>
                            <div className="text-warning">
                                <span>★★★★☆</span>
                            </div>
                        </div>
                    </div>
                    <p className="mb-0 text-secondary">Хорошие товары, приятные цены. Немного задержали доставку, но в целом всё отлично.</p>
                    <small className="text-muted d-block mt-2">10 марта 2025</small>
                </div>
            </div>

             <div className="col d-flex">
                <div className="rounded shadow p-4 w-100 bg-white">
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <img src="img/avatar2.png" alt="avatar" className="rounded-circle object-fit" width="60" height="60"  />
                        <div>
                            <h5 className="mb-0">Дмитрий Петров</h5>
                            <div className="text-warning">
                                <span>★★★★☆</span>
                            </div>
                        </div>
                    </div>
                    <p className="mb-0 text-secondary">Хорошие товары, приятные цены. Немного задержали доставку, но в целом всё отлично.</p>
                    <small className="text-muted d-block mt-2">10 марта 2025</small>
                </div>
            </div>

            <div className="col d-flex">
                <div className="rounded shadow p-4 w-100 bg-white">
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <img src="img/avatar2.png" alt="avatar" className="rounded-circle object-fit" width="60" height="60"  />
                        <div>
                            <h5 className="mb-0">Дмитрий Петров</h5>
                            <div className="text-warning">
                                <span>★★★★☆</span>
                            </div>
                        </div>
                    </div>
                    <p className="mb-0 text-secondary">Хорошие товары, приятные цены. Немного задержали доставку, но в целом всё отлично.</p>
                    <small className="text-muted d-block mt-2">10 марта 2025</small>
                </div>
            </div>

            
            <div className="col d-flex">
                <div className="rounded shadow p-4 w-100 bg-white">
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <img src="img/avatar2.png" alt="avatar" className="rounded-circle object-fit" width="60" height="60"  />
                        <div>
                            <h5 className="mb-0">Дмитрий Петров</h5>
                            <div className="text-warning">
                                <span>★★★★☆</span>
                            </div>
                        </div>
                    </div>
                    <p className="mb-0 text-secondary">Хорошие товары, приятные цены. Немного задержали доставку, но в целом всё отлично.</p>
                    <small className="text-muted d-block mt-2">10 марта 2025</small>
                </div>
            </div>

            <div className="col d-flex">
                <div className="rounded shadow p-4 w-100 bg-white">
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <img src="img/avatar2.png" alt="avatar" className="rounded-circle object-fit" width="60" height="60"  />
                        <div>
                            <h5 className="mb-0">Дмитрий Петров</h5>
                            <div className="text-warning">
                                <span>★★★★☆</span>
                            </div>
                        </div>
                    </div>
                    <p className="mb-0 text-secondary">Хорошие товары, приятные цены. Немного задержали доставку, но в целом всё отлично.</p>
                    <small className="text-muted d-block mt-2">10 марта 2025</small>
                </div>
            </div>
        </div>

        {/* <!-- кнопка "Еще отзывы" --> */}
        <div className="d-flex justify-content-center mt-5">
            <button type="button" className="sign-out d-flex myLightBlue border-0 rounded-3 justify-content-center align-items-center gap-2 p-3 px-5 text-white">
                <span>Еще отзывы</span>
            </button>
        </div>
    </section>
</div>
    )
}