"use client"
import { Fa6SolidArrowLeftLong } from "@/components/icons";
import { useRouter } from "next/navigation";

const TermAndConditionPage = () => {
    const router = useRouter();
    return (
        <div className="bg-gray-100 min-h-screen px-6 py-4">
            <div className="bg-white shadow-md rounded-md w-full flex gap-6 px-6 py-2 items-center">
                <Fa6SolidArrowLeftLong className="cursor-pointer" onClick={() => router.back()} />
                <h4 className="text-2xl font-bold text-center grow">Travel Yatri</h4>
            </div>

            <div className="bg-white p-8 shadow-md rounded-md w-full mt-6">
                <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                    <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates labore, nemo alias aperiam dicta dolorem quo laudantium vel quaerat ad quas inventore non nihil cumque magnam? Pariatur officiis, voluptatibus nulla est soluta hic sit natus. Ipsam cupiditate reiciendis velit enim! Fuga, nisi autem saepe fugit vitae similique dolores rem ipsam architecto odit necessitatibus id soluta sint placeat explicabo illo est expedita nobis beatae animi. Illo rerum nisi reiciendis eveniet necessitatibus rem, dignissimos eius, molestias veniam, ex ipsum. Quidem, maiores cumque nihil ea quisquam laboriosam facere non ab doloremque perspiciatis fuga eum id dicta rem magnam nobis eos quo nisi.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">2. Acceptance of Terms</h2>
                    <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, quasi aspernatur? Sit, architecto consequuntur. Magnam iste, numquam ullam hic tempore dignissimos voluptatibus corrupti atque in cupiditate. Temporibus enim fuga aliquam nam repudiandae quia fugit saepe, est molestiae eveniet vel deserunt distinctio illum voluptatibus dignissimos amet ullam quas corporis itaque blanditiis non cumque? Ut modi repellat sint! Saepe illo minima aliquid!</p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">3. Security</h2>
                    <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates labore, nemo alias aperiam dicta dolorem quo laudantium vel quaerat ad quas inventore non nihil cumque magnam? Pariatur officiis, voluptatibus nulla est soluta hic sit natus. Ipsam cupiditate reiciendis velit enim! Fuga, nisi autem saepe fugit vitae similique dolores rem ipsam architecto odit necessitatibus id soluta sint placeat explicabo illo est expedita nobis beatae animi. Illo rerum nisi reiciendis eveniet necessitatibus rem, dignissimos eius, molestias veniam, ex ipsum. Quidem, maiores cumque nihil ea quisquam laboriosam facere non ab doloremque perspiciatis fuga eum id dicta rem magnam nobis eos quo nisi.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">4. Privacy</h2>
                    <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, quasi aspernatur? Sit, architecto consequuntur. Magnam iste, numquam ullam hic tempore dignissimos voluptatibus corrupti atque in cupiditate. Temporibus enim fuga aliquam nam repudiandae quia fugit saepe, est molestiae eveniet vel deserunt distinctio illum voluptatibus dignissimos amet ullam quas corporis itaque blanditiis non cumque? Ut modi repellat sint! Saepe illo minima aliquid!</p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">5. User Data</h2>
                    <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates labore, nemo alias aperiam dicta dolorem quo laudantium vel quaerat ad quas inventore non nihil cumque magnam? Pariatur officiis, voluptatibus nulla est soluta hic sit natus. Ipsam cupiditate reiciendis velit enim! Fuga, nisi autem saepe fugit vitae similique dolores rem ipsam architecto odit necessitatibus id soluta sint placeat explicabo illo est expedita nobis beatae animi. Illo rerum nisi reiciendis eveniet necessitatibus rem, dignissimos eius, molestias veniam, ex ipsum. Quidem, maiores cumque nihil ea quisquam laboriosam facere non ab doloremque perspiciatis fuga eum id dicta rem magnam nobis eos quo nisi.</p>
                </section>


                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">6. Price</h2>
                    <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates labore, nemo alias aperiam dicta dolorem quo laudantium vel quaerat ad quas inventore non nihil cumque magnam? Pariatur officiis, voluptatibus nulla est soluta hic sit natus. Ipsam cupiditate reiciendis velit enim! Fuga, nisi autem saepe fugit vitae similique dolores rem ipsam architecto odit necessitatibus id soluta sint placeat explicabo illo est expedita nobis beatae animi. Illo rerum nisi reiciendis eveniet necessitatibus rem, dignissimos eius, molestias veniam, ex ipsum. Quidem, maiores cumque nihil ea quisquam laboriosam facere non ab doloremque perspiciatis fuga eum id dicta rem magnam nobis eos quo nisi.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">7. Refund</h2>
                    <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, quasi aspernatur? Sit, architecto consequuntur. Magnam iste, numquam ullam hic tempore dignissimos voluptatibus corrupti atque in cupiditate. Temporibus enim fuga aliquam nam repudiandae quia fugit saepe, est molestiae eveniet vel deserunt distinctio illum voluptatibus dignissimos amet ullam quas corporis itaque blanditiis non cumque? Ut modi repellat sint! Saepe illo minima aliquid!</p>
                </section>



            </div>
        </div>

    );
}

export default TermAndConditionPage;
