import { faChevronLeft, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div onClick={goBack} className="self-start ml-[5%]">
                <FontAwesomeIcon icon={faChevronLeft} className="text-xl text-[#5D8736]"/>
            </div>
            <div class="max-w-4xl mx-auto p-6 text-gray-800">
                <h1 class="text-3xl font-bold text-[#5D8736] mb-4">About Company</h1>

                <p class="text-lg mb-4">
                    <strong>Welcome to Tesco – Where Your Money Works for You.</strong>
                </p>

                <p class="mb-4">
                    At Tesco, we believe that smart investing shouldn't be complicated. We’re a digital-first investment platform based in Pakistan, built with one powerful mission:
                </p>

                <blockquote class="italic text-[#5D8736] font-semibold mb-6">
                    🏦 “To make wealth creation accessible, transparent, and rewarding for everyone.”
                </blockquote>

                <h2 class="text-2xl font-semibold text-gray-700 mb-2">💼 What We Do</h2>
                <p class="mb-4">
                    Tesco uses your investments for real-time trading in financial markets – leveraging expert strategies, AI-backed insights, and risk-managed portfolios. The profit earned from trading is then shared with you, giving you daily returns straight to your Tesco wallet.
                </p>
                <p class="mb-6">
                    We take the stress out of investing by doing the heavy lifting — so you can sit back and watch your money grow.
                </p>

                <h2 class="text-2xl font-semibold text-gray-700 mb-2">🔐 Our Core Values</h2>
                <ul class="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Transparency</strong> – Real-time tracking, no hidden fees, and clear profit sharing.</li>
                    <li><strong>Security</strong> – End-to-end data encryption, secure wallets, and verified operations.</li>
                    <li><strong>Growth for All</strong> – Whether you're a student, employee, or business owner — Tesco is built for everyone.</li>
                    <li><strong>Innovation</strong> – We stay ahead with tech-driven trading models and smart automation.</li>
                </ul>

                <h2 class="text-2xl font-semibold text-gray-700 mb-2">🤝 Why People Trust Tesco</h2>
                <ul class="list-disc pl-6 mb-6 space-y-2">
                    <li>Daily Profits directly to your wallet</li>
                    <li>Zero Knowledge Required – No trading experience needed</li>
                    <li>Refer & Earn with your own Tesco invite code</li>
                    <li>24/7 Support via WhatsApp</li>
                    <li>Instant Withdrawals whenever you need</li>
                </ul>

                <h2 class="text-2xl font-semibold text-gray-700 mb-2">🌍 Our Vision</h2>
                <p class="mb-6">
                    We dream of a financially empowered Pakistan — where every individual can invest, grow, and achieve financial independence from their phone. Tesco is here to bridge the gap between your dreams and your money.
                </p>

                <h2 class="text-2xl font-semibold text-gray-700 mb-2">🚀 Ready to Grow?</h2>
                <p class="mb-4">
                    Join the Tesco family and take control of your financial future. <br />
                    It’s time to stop saving — and start growing.
                </p>

                <p class="text-[#5D8736] font-semibold">Thank You Tesco best community</p>
            </div>
        </div>
    );
}