                      "use client";

                       import { auth } from "@/lib/firebaseClient";
                       import { GoogleAuthProvider, TwitterAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
                       import { useState } from "react";
                       import Navbar from "@/components/Navbar";
                       import BackgroundGrid from "@/components/BackgroundGrid";
                       import GlowButton from "@/components/GlowButton";

                       export default function Home() {
                         const [email, setEmail] = useState("");
                           const [password, setPassword] = useState("");

                             async function googleLogin() {
                                 const provider = new GoogleAuthProvider();
                                     await signInWithPopup(auth, provider);
                                         window.location.href = "/dashboard";
                                           }

                                             async function twitterLogin() {
                                                 const provider = new TwitterAuthProvider();
                                                     await signInWithPopup(auth, provider);
                                                         window.location.href = "/dashboard";
                                                           }

                                                             async function emailLogin() {
                                                                 await signInWithEmailAndPassword(auth, email, password);
                                                                     window.location.href = "/dashboard";
                                                                       }

                                                                         return (
                                                                             <>
                                                                                   <Navbar />
                                                                                         <BackgroundGrid />

                                                                                               <div style={{ padding: "40px", textAlign: "center" }}>
                                                                                                       <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>ZEIROKO</h1>
                                                                                                               <p style={{ marginBottom: "35px" }}>Peer-to-peer banner advertising platform</p>

                                                                                                                       <div style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: 300, margin: "0 auto" }}>
                                                                                                                                 <GlowButton text="Sign in with Google" onClick={googleLogin} />
                                                                                                                                           <GlowButton text="Sign in with Twitter" onClick={twitterLogin} />

                                                                                                                                                     <input 
                                                                                                                                                                 style={{ padding: "12px", borderRadius: "8px" }} 
                                                                                                                                                                             placeholder="Email" 
                                                                                                                                                                                         onChange={(e) => setEmail(e.target.value)} 
                                                                                                                                                                                                   />

                                                                                                                                                                                                             <input 
                                                                                                                                                                                                                         style={{ padding: "12px", borderRadius: "8px" }} 
                                                                                                                                                                                                                                     type="password" 
                                                                                                                                                                                                                                                 placeholder="Password" 
                                                                                                                                                                                                                                                             onChange={(e) => setPassword(e.target.value)} 
                                                                                                                                                                                                                                                                       />

                                                                                                                                                                                                                                                                                 <GlowButton text="Sign in with Email" onClick={emailLogin} />
                                                                                                                                                                                                                                                                                         </div>
                                                                                                                                                                                                                                                                                               </div>
                                                                                                                                                                                                                                                                                                   </>
                                                                                                                                                                                                                                                                                                     );
                                                                                                                                                                                                                                                                                                     }