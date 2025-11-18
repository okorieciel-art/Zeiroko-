'use client';
import { useRef, useState } from 'react';
import axios from 'axios';

export default function CloudinaryUpload({ onUploaded }) {
  const fileRef = useRef();
    const [progress, setProgress] = useState(0);

      async function uploadFile(file) {
          try {
                const sign = await fetch('/api/cloudinary/sign');
                      const sig = await sign.json();
                            const form = new FormData();
                                  form.append('file', file);
                                        form.append('api_key', sig.api_key);
                                              form.append('timestamp', sig.timestamp);
                                                    form.append('signature', sig.signature);
                                                          const res = await axios.post(`https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`, form, {
                                                                  onUploadProgress: e => setProgress(Math.round((e.loaded / e.total) * 100))
                                                                        });
                                                                              onUploaded && onUploaded(res.data);
                                                                                  } catch (err) {
                                                                                        alert('Upload failed: ' + (err.message || err));
                                                                                            }
                                                                                              }

                                                                                                return (
                                                                                                    <div>
                                                                                                          <input type="file" ref={fileRef} onChange={e => uploadFile(e.target.files[0])} />
                                                                                                                {progress > 0 && <div>Uploading {progress}%</div>}
                                                                                                                    </div>
                                                                                                                      );
                                                                                                                      }