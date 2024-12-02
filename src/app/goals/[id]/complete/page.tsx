"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Navigation } from "~/components/nav";
import Image from "next/image";

export default function GoalCompletePage({
    params,
}: {
    params: { id: string };
}) {
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null);
    const [description, setDescription] = useState("");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/goals/${params.id}/success`);
    };

    return (
        <div className="min-h-screen pb-20">
            <div className="max-w-md mx-auto p-4">
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div className="space-y-2">
                        <label className="block relative aspect-square rounded-lg border-2 border-dashed transition-colors cursor-pointer overflow-hidden">
                            {image ? (
                                <Image
                                    src={image}
                                    alt="Uploaded preview"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <Upload className="w-10 h-10 mb-2" />
                                    <span>Upload Image</span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div className="space-y-2">
                        <Textarea
                            placeholder="Add a description..."
                            value={description}
                            onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>
                            ) => setDescription(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                        Complete Goal
                    </Button>
                </motion.form>
            </div>
            <Navigation />
        </div>
    );
}
