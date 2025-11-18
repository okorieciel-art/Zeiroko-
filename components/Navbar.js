
"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

    return (
        <>
              <div className="hamburger" onClick={() => setOpen(!open)}>
                      ☰
                            </div>

                                  <div className={`sidebar ${open ? "open" : ""}`}>
                                          <a href="/">Home</a>
                                                  <a href="/about">About</a>
                                                          <a href="/how-it-works">How it Works</a>
                                                                  <a href="/faq">FAQ</a>
                                                                          <a href="/">Sign In / Sign Up</a>
                                                                                </div>
                                                                                    </>
                                                                                      );
                                                                                      }

                                                                                     