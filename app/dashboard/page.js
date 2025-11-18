"use client";
import Navbar from "@/components/Navbar";
import BackgroundGrid from "@/components/BackgroundGrid";

export default function Dashboard() {
  return (
      <>
            <Navbar />
                  <BackgroundGrid />
                        <div className="section">
                                <h1 className="title">Choose your role</h1>
                                        <p className="subtitle">Select whether you're a host or an advertiser.</p>

                                                <div style={{ display: "flex", gap: "24px" }}>
                                                          <a href="/host" className="card" style={{ width: "45%" }}>
                                                                      <h2>I'm a Host</h2>
                                                                                  <p>Set your price, connect metrics, and offer ad placements.</p>
                                                                                            </a>

                                                                                                      <a href="/advertiser" className="card" style={{ width: "45%" }}>
                                                                                                                  <h2>I'm an Advertiser</h2>
                                                                                                                              <p>Browse hosts and run ads in Web3-native spaces.</p>
                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                      </div>
                                                                                                                                                          </>
                                                                                                                                                            );
                                                                                                                                                            }
                                                                                                                                                            