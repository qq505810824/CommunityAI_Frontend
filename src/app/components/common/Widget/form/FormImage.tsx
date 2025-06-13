import { createClient } from '@supabase/supabase-js';
import { useRef, useState } from "react";

interface ViewProps {
    setValue?: any;
    key_url: string
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export default function FormImage(props: any) {
    const { setValue, key_url, storage, name, label, schema, required, value, onChange, disabled } = props;
    // console.log(props);

    const [selectedImage, setSelectedImage] = useState<string | null>(value);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showReplaceButton, setShowReplaceButton] = useState(false);
    const [uploadImageLoading, setUploadImageLoading] = useState(false);

    const handleClickFile = (e: any) => {
        e.stopPropagation();
        fileInputRef.current?.click();
    };

    const compressImage = async (
        file: File,
        quality = 0.85,
        maxWidth = 1200,
        maxHeight = 1200
    ): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const img = new window.Image();
            const url = URL.createObjectURL(file);

            img.onload = () => {
                let { width, height } = img;
                // 限制最大宽高
                if (width > maxWidth || height > maxHeight) {
                    const scale = Math.min(maxWidth / width, maxHeight / height);
                    width = width * scale;
                    height = height * scale;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) resolve(blob);
                        else reject(new Error('图片压缩失败'));
                    },
                    'image/jpeg', // 你也可以根据 file.type 动态选择
                    quality // 0.8~0.9 通常清晰度和体积都不错
                );
                URL.revokeObjectURL(url);
            };
            img.onerror = reject;
            img.src = url;
        });
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadImageLoading(true);

            // 压缩图片
            let compressedFile: Blob;
            try {
                compressedFile = await compressImage(file, 0.85, 1200, 1200); // 你可以调整参数
            } catch (e) {
                setUploadImageLoading(false);
                alert('图片压缩失败');
                return;
            }

            const filePath = `${storage}_${Math.random()}-${Date.now()}`;
            const { error: uploadError } = await supabase.storage
                .from(storage || 'calendars')
                .upload(filePath, compressedFile, {
                    cacheControl: '3600',
                    upsert: true
                });

            if (uploadError) {
                setUploadImageLoading(false);
                throw uploadError;
            }
            // 获取完整的公共 URL
            const imageUrl = getImageUrl(filePath);
            setValue && setValue(key_url, imageUrl);
            onChange && onChange(imageUrl)
            setSelectedImage(imageUrl);
            setUploadImageLoading(false);
            if (fileInputRef.current)
                fileInputRef.current.value = ""
        }
    };

    // 添加一个函数来获取图片 URL
    const getImageUrl = (path: string | null) => {
        if (!path) return '/default-avatar.png';
        if (path.startsWith('http')) return path;

        const {
            data: { publicUrl }
        } = supabase.storage.from(storage || 'calendars').getPublicUrl(path);

        return publicUrl;
    };

    return (
        <>
            <div
                className="w-full flex justify-center relative"
            >
                <div
                    className="bg-gray-200 font-semibold rounded-sm flex justify-center flex-col items-center text-center w-[250px] h-[300px] cursor-pointer relative"
                    onClick={(e) => handleClickFile(e)}
                    onMouseEnter={() => selectedImage && setShowReplaceButton(true)}
                    onMouseLeave={() => setShowReplaceButton(false)}
                >
                    {selectedImage ? (
                        <>
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="w-full h-auto object-cover rounded-sm"
                            />
                            {showReplaceButton && (
                                <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                                        onClick={(e) => {
                                            handleClickFile(e);
                                        }}
                                    >
                                        更換圖片
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <p>上傳{label}圖片</p>
                            <p className="text-xs">({schema?.['tip'] || '建議上傳圖片比例5:6,限6M內'})</p>
                        </>
                    )}

                    {uploadImageLoading && (
                        <div className=" absolute w-full h-full inset-0 z-20 flex flex-col items-center justify-center bg-gray-100/80">
                            <svg
                                className="animate-spin h-8 w-8 text-blue-500 mb-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z"
                                ></path>
                            </svg>
                            <span className="text-blue-500">上載中...</span>
                        </div>
                    )}
                </div>
            </div>
            <input
                type="file"
                accept=".png,.jpg,.jpeg"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
        </>
    )
}