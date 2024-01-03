import React, {useEffect, useState} from "react";
import api from "../http/api";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function FAQComponent() {

    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        async function getFAQs() {
            await api.get('/faq').then(res => {
                console.log(res.data);
                setFaqs(res.data);
            });
        }

        getFAQs().catch(() => toast.error('Dogodila se greška'));
    }, []);

    return (
        <>
            <div className={'grid grid-cols-4 gap-3 m-4'}>
                {faqs.map((faq, key) => (
                    <>
                        <div key={key} className={'bg-sky-200 p-4 rounded-xl w-full'}>
                            <div>
                                <span className={'font-bold text-2xl text-sky-900'}>{faq.question}</span>
                                <span className="border-t border-sky-900 block my-4 w-full"></span>
                                <span className={'font-bold text-lg text-sky-900'}>{faq.answer}</span>
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
        </>
    );
}

export default FAQComponent;