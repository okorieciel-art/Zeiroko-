// components/WalletConnectVerify.jsx
'use client';
import React, { useState } from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import axios from 'axios';

export default function WalletConnectVerify({ idToken /* optional - Firebase idToken */ }) {
  const [addr, setAddr] = useState(null);
    const [status, setStatus] = useState('');
      const idTok = idToken || (typeof window !== 'undefined' && localStorage.getItem('ZE_ID_TOKEN'));

        async function connectAndVerify() {
            setStatus('Initializing wallet connect...');
                try {
                      const provider = new WalletConnectProvider({
                              rpc: {
                                        1: 'https://cloudflare-eth.com',
                                                  137: 'https://polygon-rpc.com'
                                                          },
                                                                  qrcode: true
                                                                        });

                                                                              // enable session (open QR)
                                                                                    await provider.enable();

                                                                                          // make an ethers provider
                                                                                                const web3Provider = new ethers.BrowserProvider(provider); // ethers v6
                                                                                                      const signer = await web3Provider.getSigner();
                                                                                                            const address = await signer.getAddress();
                                                                                                                  setAddr(address);

                                                                                                                        setStatus('Requesting nonce from server...');
                                                                                                                              // request nonce
                                                                                                                                    const nonceResp = await fetch('/api/user/wallet/nonce', {
                                                                                                                                            method: 'GET',
                                                                                                                                                    headers: { Authorization: `Bearer ${idTok}` }
                                                                                                                                                          });

                                                                                                                                                                const nonceJson = await nonceResp.json();
                                                                                                                                                                      if (!nonceResp.ok) {
                                                                                                                                                                              setStatus('Failed to get nonce: ' + (nonceJson.error || JSON.stringify(nonceJson)));
                                                                                                                                                                                      return;
                                                                                                                                                                                            }

                                                                                                                                                                                                  const message = nonceJson.message;
                                                                                                                                                                                                        setStatus('Signing message...');
                                                                                                                                                                                                              // sign the message
                                                                                                                                                                                                                    const signed = await signer.signMessage(message);

                                                                                                                                                                                                                          setStatus('Verifying signature with server...');
                                                                                                                                                                                                                                // send signature and address to server
                                                                                                                                                                                                                                      const verifyResp = await fetch('/api/user/wallet/verify', {
                                                                                                                                                                                                                                              method: 'POST',
                                                                                                                                                                                                                                                      headers: {
                                                                                                                                                                                                                                                                'Content-Type': 'application/json',
                                                                                                                                                                                                                                                                          Authorization: `Bearer ${idTok}`
                                                                                                                                                                                                                                                                                  },
                                                                                                                                                                                                                                                                                          body: JSON.stringify({ address, signature: signed })
                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                      const verifyJson = await verifyResp.json();
                                                                                                                                                                                                                                                                                                            if (!verifyResp.ok) {
                                                                                                                                                                                                                                                                                                                    setStatus('Verification failed: ' + (verifyJson.error || JSON.stringify(verifyJson)));
                                                                                                                                                                                                                                                                                                                            return;
                                                                                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                                                                                        setStatus('Wallet verified and linked: ' + verifyJson.walletAddress);
                                                                                                                                                                                                                                                                                                                                            } catch (err) {
                                                                                                                                                                                                                                                                                                                                                  console.error(err);
                                                                                                                                                                                                                                                                                                                                                        setStatus('Error: ' + (err.message || err));
                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                                                                                                                return (
                                                                                                                                                                                                                                                                                                                                                                    <div>
                                                                                                                                                                                                                                                                                                                                                                          <div style={{ marginBottom: 8 }}>
                                                                                                                                                                                                                                                                                                                                                                                  <button className="glow-btn" onClick={connectAndVerify}>Connect Wallet (WalletConnect)</button>
                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                              <div style={{ fontSize: 13, color: '#cfccee' }}>{status}</div>
                                                                                                                                                                                                                                                                                                                                                                                                    {addr && <div style={{ marginTop: 8 }}><small>Address: {addr}</small></div>}
                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                                                                                                          }