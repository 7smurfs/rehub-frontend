import React, {useEffect, useState} from "react";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../http/api";
import {toast, ToastContainer} from "react-toastify";

function FAQ() {

    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        async function getFAQs() {
            await api.get('/faq').then(res => {
                setFaqs(res.data);
            });
        }

        getFAQs().catch(() => toast.error('Dogodila se greška'));
    }, []);

    return (
        <PageLayout>
            <Header/>
            <div className={'grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 m-4'}>
                {faqs.map((faq, key) => (
                    <>
                        <div key={key} className={'bg-lightSky p-4 rounded-xl w-full'}>
                            <div>
                                <span className={'font-bold text-2xl text-darkerSky'}>{faq.question}</span>
                                <span className="border-t border-darkerSky block my-4 w-full"></span>
                                <span className={'font-bold text-lg text-darkerSky'}>{faq.answer}</span>
                            </div>
                        </div>
                    </>
                ))}
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                limit={2}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Footer/>
        </PageLayout>
    );
}

export default FAQ;
