import Navbar from '@/components/Navbar';
import AnimatedCanvasBackground from '@/components/AnimatedCanvasBackground';
import ThemeToggle from '@/components/ThemeToggle';
import WalletConnectVerify from '@/components/WalletConnectVerify';
import Messaging from '@/components/Messaging';

export default function HostPage() {
  const threadId = 'host:exampleHost|adv:exampleAdv';
  
    return (
        <>
              <AnimatedCanvasBackground />
                    <Navbar />
                          <div style={{ padding:28 }}>
                                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                            <h1>Host Dashboard</h1>
                                                      <ThemeToggle />
                                                              </div>
                                                              
                                                                      <section style={{ marginTop:20 }}>
                                                                                <h3>Connect wallet</h3>
                                                                                          <WalletConnectVerify />
                                                                                                  </section>
                                                                                                  
                                                                                                          <section style={{ marginTop:28 }}>
                                                                                                                    <h3>Messages</h3>
                                                                                                                              <Messaging threadId={threadId} otherUserUid={'some-other-uid'} />
                                                                                                                                      </section>
                                                                                                                                            </div>
                                                                                                                                                </>
                                                                                                                                                  );
                                                                                                                                                  }                                               