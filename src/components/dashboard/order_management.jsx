import React from "react";

const OrderManagement = () => {
  return (
    <div style={{width: '100%', height: '100%', paddingRight: 26, background: '#FAFAFA', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 26, display: 'inline-flex'}}>
    <div style={{width: 260, alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        <div style={{width: 260, alignSelf: 'stretch', paddingBottom: 10, background: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', paddingTop: 20, paddingBottom: 20, paddingLeft: 18, paddingRight: 14, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                <div style={{flex: '1 1 0', color: '#23272E', fontSize: 22, fontFamily: 'Public Sans', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>App Name</div>
                <div style={{width: 24, height: 24, position: 'relative'}}>
                    <div style={{width: 24, height: 24, left: 0, top: 0, position: 'absolute'}}></div>
                    <div style={{width: 7, height: 1, left: 13, top: 5.50, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                    <div style={{width: 9, height: 1, left: 11, top: 11.50, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                    <div style={{width: 7, height: 1, left: 13, top: 17.50, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                    <div style={{width: 4, height: 8, left: 4, top: 8, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                </div>
            </div>
            <div style={{alignSelf: 'stretch', paddingLeft: 30, paddingRight: 30, paddingTop: 15, paddingBottom: 15, borderRadius: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                <div style={{color: '#8B909A', fontSize: 11, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 14, wordWrap: 'break-word'}}>MAIN MENU</div>
            </div>
            <div style={{alignSelf: 'stretch', height: 367, paddingLeft: 14, paddingRight: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                <div style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 9, paddingBottom: 9, borderRadius: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{width: 22, height: 22, position: 'relative'}}>
                        <div style={{width: 22, height: 22, left: 0, top: 0, position: 'absolute'}}></div>
                        <div style={{width: 14.67, height: 14.68, left: 3.69, top: 3.67, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                        <div style={{width: 7.33, height: 0.92, left: 7.33, top: 13.75, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                    </div>
                    <div style={{flex: '1 1 0', color: '#8B909A', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>Dashboard</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 9, paddingBottom: 9, background: '#00DB63', borderRadius: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{width: 22, height: 22, position: 'relative'}}>
                        <div style={{width: 22, height: 22, left: 0, top: 0, position: 'absolute'}}></div>
                        <div style={{width: 3.67, height: 3.67, left: 3.67, top: 15.58, position: 'absolute', borderRadius: 9999, border: '1.75px #23272E solid'}} />
                        <div style={{width: 3.67, height: 3.67, left: 13.75, top: 15.58, position: 'absolute', borderRadius: 9999, border: '1.75px #23272E solid'}} />
                        <div style={{width: 11.92, height: 12.83, left: 3.67, top: 2.75, position: 'absolute', border: '1.75px #23272E solid'}}></div>
                        <div style={{width: 12.83, height: 7.33, left: 5.50, top: 4.58, position: 'absolute', border: '1.75px #23272E solid'}}></div>
                    </div>
                    <div style={{flex: '1 1 0', color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 22, wordWrap: 'break-word'}}>Order Management</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 9, paddingBottom: 9, borderRadius: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{width: 22, height: 22, position: 'relative'}}>
                        <div style={{width: 22, height: 22, left: 0, top: 0, position: 'absolute'}}></div>
                        <div style={{width: 7.33, height: 7.33, left: 4.58, top: 2.75, position: 'absolute', borderRadius: 9999, border: '1.75px #8B909A solid'}} />
                        <div style={{width: 11, height: 5.50, left: 2.75, top: 13.75, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                        <div style={{width: 2.76, height: 7.10, left: 14.67, top: 2.87, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                        <div style={{width: 2.75, height: 5.36, left: 16.50, top: 13.89, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                    </div>
                    <div style={{flex: '1 1 0', color: '#8B909A', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>Troops</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 9, paddingBottom: 9, borderRadius: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{width: 22, height: 22, position: 'relative'}}>
                        <div style={{width: 22, height: 22, left: 0, top: 0, position: 'absolute'}}></div>
                        <div style={{width: 11.92, height: 11.92, left: 2.75, top: 2.75, position: 'absolute', borderRadius: 9999, border: '1.75px #8B909A solid'}} />
                        <div style={{width: 10.08, height: 10.08, left: 9.17, top: 9.17, position: 'absolute', borderRadius: 2, border: '1.75px #8B909A solid'}} />
                    </div>
                    <div style={{flex: '1 1 0', color: '#8B909A', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>Messages</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 9, paddingBottom: 9, borderRadius: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{width: 22, height: 22, position: 'relative'}}>
                        <div style={{width: 22, height: 22, left: 0, top: 0, position: 'absolute'}}></div>
                        <div style={{width: 4.58, height: 4.58, left: 12.83, top: 2.75, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                        <div style={{width: 12.83, height: 16.50, left: 4.58, top: 2.75, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                        <div style={{width: 0.92, height: 0.92, left: 8.25, top: 7.79, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                        <div style={{width: 5.50, height: 0.92, left: 8.25, top: 11.46, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                        <div style={{width: 5.50, height: 0.92, left: 8.25, top: 15.12, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                    </div>
                    <div style={{flex: '1 1 0', color: '#8B909A', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>Prizes</div>
                </div>
                <div style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 9, paddingBottom: 9, borderRadius: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{width: 22, height: 22, position: 'relative'}}>
                        <div style={{width: 22, height: 22, left: 0, top: 0, position: 'absolute'}}></div>
                        <div style={{width: 4.58, height: 4.58, left: 12.83, top: 2.75, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                        <div style={{width: 12.83, height: 16.50, left: 4.58, top: 2.75, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                        <div style={{width: 0.92, height: 0.92, left: 8.25, top: 7.79, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                        <div style={{width: 5.50, height: 0.92, left: 8.25, top: 11.46, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                        <div style={{width: 5.50, height: 0.92, left: 8.25, top: 15.12, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                    </div>
                    <div style={{flex: '1 1 0', color: '#8B909A', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>Cookies</div>
                </div>
            </div>
        </div>
    </div>
    <div style={{width: 1128, height: 1080, position: 'relative', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
        <div style={{height: 62, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', height: 62, paddingTop: 12, paddingBottom: 12, boxShadow: '0px 2px 4px rgba(165, 163, 174, 0.30)', borderRadius: 6, overflow: 'hidden', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                <div style={{flex: '1 1 0', alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                    <div style={{flex: '1 1 0', color: '#23272E', fontSize: 24, fontFamily: 'Public Sans', fontWeight: '700', lineHeight: 22, wordWrap: 'break-word'}}>Order Management</div>
                </div>
                <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 24, display: 'flex'}}>
                    <div style={{width: 38, height: 38, position: 'relative'}}>
                        <div style={{width: 38, height: 38, left: 0, top: -0.50, position: 'absolute', borderRadius: 100, overflow: 'hidden'}}>
                            <div style={{width: 38, height: 38, left: 0, top: 0, position: 'absolute'}}>
                                <div style={{width: 38, height: 38, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(0deg, #7367F0 0%, #7367F0 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)'}} />
                                <div style={{width: 30.61, height: 30.61, left: 3.69, top: 3.69, position: 'absolute', borderRadius: 100}} />
                            </div>
                            <div style={{width: 38, height: 38, left: 0, top: 0, position: 'absolute'}} />
                        </div>
                        <div style={{width: 8, height: 8, left: 27.76, top: 28.74, position: 'absolute', background: '#28C76F', borderRadius: 9999, border: '2px white solid'}} />
                    </div>
                </div>
            </div>
        </div>
        <div style={{width: 1128, borderTopLeftRadius: 6, borderTopRightRadius: 6, borderBottom: '1px #DBDADE solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
            <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, borderTopLeftRadius: 6, overflow: 'hidden', borderBottom: '2px #005C29 solid', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                <div style={{color: '#005C29', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>Pending</div>
            </div>
            <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, borderTopLeftRadius: 6, overflow: 'hidden', borderBottom: '2px solid', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                <div style={{color: '#8B909A', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>Completed</div>
            </div>
            <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, borderTopLeftRadius: 6, overflow: 'hidden', borderBottom: '2px solid', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                <div style={{color: '#8B909A', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>Cancelled</div>
            </div>
        </div>
        <div style={{width: 200, height: 40, background: 'white', boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.04)', borderRadius: 4, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', height: 37, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, borderRadius: 4, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                <div style={{flex: '1 1 0', color: '#8B909A', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 21, wordWrap: 'break-word'}}>Search by order id</div>
                <div style={{width: 18, height: 18, position: 'relative'}}>
                    <div style={{width: 18, height: 18, left: 0, top: 0, position: 'absolute'}}>
                        <div style={{width: 18, height: 18, left: 0, top: 0, position: 'absolute'}}></div>
                        <div style={{width: 14.33, height: 14.33, left: 1.50, top: 1.50, position: 'absolute', background: '#8B909A'}}></div>
                    </div>
                </div>
            </div>
        </div>
        <div style={{background: 'white', boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.04)', borderRadius: 6, overflow: 'hidden', border: '1px solid', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 199, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 6, display: 'flex'}}>
                <div style={{color: '#8B909A', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '500', letterSpacing: 0.43, wordWrap: 'break-word'}}>Filter by date range</div>
                <div style={{width: 16, height: 16, position: 'relative'}}>
                    <div style={{width: 16, height: 16, left: 0, top: 0, position: 'absolute'}}></div>
                    <div style={{width: 8, height: 4, left: 4, top: 6, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                </div>
            </div>
        </div>
        <div style={{width: 1128, height: 726, position: 'relative'}}>
            <div style={{width: 1128, height: 726, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 16}} />
            <div style={{height: 794, left: 0, top: 8, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 24, borderBottom: '1px #E9E7FD solid', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', height: 47, paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                        <div style={{color: '#8B909A', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '500', textTransform: 'uppercase', wordWrap: 'break-word'}}>Order id</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 47, paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                        <div style={{width: 61, color: '#8B909A', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '500', textTransform: 'uppercase', wordWrap: 'break-word'}}>Created</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 47, paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                        <div style={{color: '#8B909A', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '500', textTransform: 'uppercase', wordWrap: 'break-word'}}>customer</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 47, paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                        <div style={{color: '#8B909A', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '500', textTransform: 'uppercase', wordWrap: 'break-word'}}>total</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 47, paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                        <div style={{color: '#8B909A', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '500', textTransform: 'uppercase', wordWrap: 'break-word'}}>DATE</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 47, paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                        <div style={{color: '#8B909A', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '500', textTransform: 'uppercase', wordWrap: 'break-word'}}>Status</div>
                    </div>
                    <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 13, paddingBottom: 13, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}} />
                </div>
                <div style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 24, borderBottom: '1px #E9E7FD solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', height: 15, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
                            <div style={{width: 96, flex: '1 1 0', color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 22, wordWrap: 'break-word'}}>#6548</div>
                        </div>
                    </div>
                    <div style={{flex: '1 1 0', height: 58, paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 70, color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>2 min ago</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 14, paddingBottom: 14, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>John Doe</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 48, paddingLeft: 20, paddingRight: 20, paddingTop: 13, paddingBottom: 13, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>$15.99</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 36, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>MM/DD/YYYY</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 60, paddingLeft: 20, paddingRight: 20, paddingTop: 17, paddingBottom: 17, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, background: 'rgba(255, 198, 0, 0.16)', borderRadius: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <div style={{color: '#FFC600', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 14, wordWrap: 'break-word'}}>Pending</div>
                            <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(90deg)', transformOrigin: '0 0'}}>
                                <div style={{width: 4.93, height: 8, left: 5.33, top: 4, position: 'absolute', background: '#FFC600'}}></div>
                            </div>
                        </div>
                    </div>
                    <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 24, height: 24, position: 'relative'}}>
                            <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute', background: '#8B909A'}}></div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 24, borderBottom: '1px #E9E7FD solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', height: 58, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
                            <div style={{width: 96, height: 44, color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 22, wordWrap: 'break-word'}}>#6548</div>
                        </div>
                    </div>
                    <div style={{flex: '1 1 0', height: 58, paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 70, color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>2 min ago</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 14, paddingBottom: 14, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>John Doe</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 48, paddingLeft: 20, paddingRight: 20, paddingTop: 13, paddingBottom: 13, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>$15.99</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 36, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>MM/DD/YYYY</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 60, paddingLeft: 20, paddingRight: 20, paddingTop: 17, paddingBottom: 17, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, background: 'rgba(255, 198, 0, 0.16)', borderRadius: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <div style={{color: '#FFC600', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 14, wordWrap: 'break-word'}}>Pending</div>
                            <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(90deg)', transformOrigin: '0 0'}}>
                                <div style={{width: 4.93, height: 8, left: 5.33, top: 4, position: 'absolute', background: '#FFC600'}}></div>
                            </div>
                        </div>
                    </div>
                    <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 24, height: 24, position: 'relative'}}>
                            <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute', background: '#8B909A'}}></div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 24, borderBottom: '1px #E9E7FD solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', height: 58, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
                            <div style={{width: 96, height: 44, color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 22, wordWrap: 'break-word'}}>#6548</div>
                        </div>
                    </div>
                    <div style={{flex: '1 1 0', height: 58, paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 70, color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>2 min ago</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 14, paddingBottom: 14, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>John Doe</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 48, paddingLeft: 20, paddingRight: 20, paddingTop: 13, paddingBottom: 13, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>$15.99</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 36, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>MM/DD/YYYY</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 60, paddingLeft: 20, paddingRight: 20, paddingTop: 17, paddingBottom: 17, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, background: 'rgba(255, 198, 0, 0.16)', borderRadius: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <div style={{color: '#FFC600', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 14, wordWrap: 'break-word'}}>Pending</div>
                            <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(90deg)', transformOrigin: '0 0'}}>
                                <div style={{width: 4.93, height: 8, left: 5.33, top: 4, position: 'absolute', background: '#FFC600'}}></div>
                            </div>
                        </div>
                    </div>
                    <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 24, height: 24, position: 'relative'}}>
                            <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute', background: '#8B909A'}}></div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 24, borderBottom: '1px #E9E7FD solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', height: 15, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
                            <div style={{width: 96, flex: '1 1 0', color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 22, wordWrap: 'break-word'}}>#6548</div>
                        </div>
                    </div>
                    <div style={{flex: '1 1 0', height: 58, paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 70, color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>2 min ago</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 14, paddingBottom: 14, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>John Doe</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 48, paddingLeft: 20, paddingRight: 20, paddingTop: 13, paddingBottom: 13, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>$15.99</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 36, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>MM/DD/YYYY</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 60, paddingLeft: 20, paddingRight: 20, paddingTop: 17, paddingBottom: 17, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, background: 'rgba(255, 198, 0, 0.16)', borderRadius: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <div style={{color: '#FFC600', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 14, wordWrap: 'break-word'}}>Pending</div>
                            <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(90deg)', transformOrigin: '0 0'}}>
                                <div style={{width: 4.93, height: 8, left: 5.33, top: 4, position: 'absolute', background: '#FFC600'}}></div>
                            </div>
                        </div>
                    </div>
                    <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 24, height: 24, position: 'relative'}}>
                            <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute', background: '#8B909A'}}></div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 24, borderBottom: '1px #E9E7FD solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', height: 58, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{height: 44, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
                            <div style={{width: 96, flex: '1 1 0', color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 22, wordWrap: 'break-word'}}>#6548</div>
                        </div>
                    </div>
                    <div style={{flex: '1 1 0', height: 58, paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 70, color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>2 min ago</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 14, paddingBottom: 14, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>John Doe</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 48, paddingLeft: 20, paddingRight: 20, paddingTop: 13, paddingBottom: 13, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>$15.99</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 36, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>MM/DD/YYYY</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 60, paddingLeft: 20, paddingRight: 20, paddingTop: 17, paddingBottom: 17, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, background: 'rgba(255, 198, 0, 0.16)', borderRadius: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <div style={{color: '#FFC600', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 14, wordWrap: 'break-word'}}>Pending</div>
                            <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(90deg)', transformOrigin: '0 0'}}>
                                <div style={{width: 4.93, height: 8, left: 5.33, top: 4, position: 'absolute', background: '#FFC600'}}></div>
                            </div>
                        </div>
                    </div>
                    <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 24, height: 24, position: 'relative'}}>
                            <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute', background: '#8B909A'}}></div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 24, borderBottom: '1px #E9E7FD solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', height: 15, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
                            <div style={{width: 96, flex: '1 1 0', color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 22, wordWrap: 'break-word'}}>#6548</div>
                        </div>
                    </div>
                    <div style={{flex: '1 1 0', height: 136, paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 70, color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>2 min ago</div>
                        <div style={{width: 100, height: 100, position: 'relative'}} />
                    </div>
                    <div style={{flex: '1 1 0', height: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 14, paddingBottom: 14, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>John Doe</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 48, paddingLeft: 20, paddingRight: 20, paddingTop: 13, paddingBottom: 13, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>$15.99</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 36, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>MM/DD/YYYY</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 60, paddingLeft: 20, paddingRight: 20, paddingTop: 17, paddingBottom: 17, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, background: 'rgba(255, 198, 0, 0.16)', borderRadius: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <div style={{color: '#FFC600', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 14, wordWrap: 'break-word'}}>Pending</div>
                            <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(90deg)', transformOrigin: '0 0'}}>
                                <div style={{width: 4.93, height: 8, left: 5.33, top: 4, position: 'absolute', background: '#FFC600'}}></div>
                            </div>
                        </div>
                    </div>
                    <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 24, height: 24, position: 'relative'}}>
                            <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute', background: '#8B909A'}}></div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 24, borderBottom: '1px #E9E7FD solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', height: 15, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
                            <div style={{width: 96, flex: '1 1 0', color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 22, wordWrap: 'break-word'}}>#6548</div>
                        </div>
                    </div>
                    <div style={{flex: '1 1 0', height: 58, paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 70, color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>2 min ago</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 14, paddingBottom: 14, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>John Doe</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 48, paddingLeft: 20, paddingRight: 20, paddingTop: 13, paddingBottom: 13, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>$15.99</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 36, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>MM/DD/YYYY</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 60, paddingLeft: 20, paddingRight: 20, paddingTop: 17, paddingBottom: 17, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, background: 'rgba(255, 198, 0, 0.16)', borderRadius: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <div style={{color: '#FFC600', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 14, wordWrap: 'break-word'}}>Pending</div>
                            <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(90deg)', transformOrigin: '0 0'}}>
                                <div style={{width: 4.93, height: 8, left: 5.33, top: 4, position: 'absolute', background: '#FFC600'}}></div>
                            </div>
                        </div>
                    </div>
                    <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 24, height: 24, position: 'relative'}}>
                            <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute', background: '#8B909A'}}></div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 24, borderBottom: '1px #E9E7FD solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', height: 15, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
                            <div style={{width: 96, flex: '1 1 0', color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 22, wordWrap: 'break-word'}}>#6548</div>
                        </div>
                    </div>
                    <div style={{flex: '1 1 0', height: 58, paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 70, color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>2 min ago</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 14, paddingBottom: 14, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>John Doe</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 48, paddingLeft: 20, paddingRight: 20, paddingTop: 13, paddingBottom: 13, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>$15.99</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 36, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>MM/DD/YYYY</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 60, paddingLeft: 20, paddingRight: 20, paddingTop: 17, paddingBottom: 17, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, background: 'rgba(255, 198, 0, 0.16)', borderRadius: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <div style={{color: '#FFC600', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 14, wordWrap: 'break-word'}}>Pending</div>
                            <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(90deg)', transformOrigin: '0 0'}}>
                                <div style={{width: 4.93, height: 8, left: 5.33, top: 4, position: 'absolute', background: '#FFC600'}}></div>
                            </div>
                        </div>
                    </div>
                    <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 24, height: 24, position: 'relative'}}>
                            <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute', background: '#8B909A'}}></div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 24, borderBottom: '1px #E9E7FD solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', height: 15, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
                            <div style={{width: 96, flex: '1 1 0', color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 22, wordWrap: 'break-word'}}>#6548</div>
                        </div>
                    </div>
                    <div style={{flex: '1 1 0', height: 58, paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 70, color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>2 min ago</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 14, paddingBottom: 14, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>John Doe</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 48, paddingLeft: 20, paddingRight: 20, paddingTop: 13, paddingBottom: 13, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>$15.99</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 36, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>MM/DD/YYYY</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 60, paddingLeft: 20, paddingRight: 20, paddingTop: 17, paddingBottom: 17, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, background: 'rgba(255, 198, 0, 0.16)', borderRadius: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <div style={{color: '#FFC600', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 14, wordWrap: 'break-word'}}>Pending</div>
                            <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(90deg)', transformOrigin: '0 0'}}>
                                <div style={{width: 4.93, height: 8, left: 5.33, top: 4, position: 'absolute', background: '#FFC600'}}></div>
                            </div>
                        </div>
                    </div>
                    <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 24, height: 24, position: 'relative'}}>
                            <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute', background: '#8B909A'}}></div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 24, borderBottom: '1px #E9E7FD solid', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', height: 15, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
                            <div style={{width: 96, flex: '1 1 0', color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 22, wordWrap: 'break-word'}}>#6548</div>
                        </div>
                    </div>
                    <div style={{flex: '1 1 0', height: 58, paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 70, color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>2 min ago</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 14, paddingBottom: 14, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{width: 110, color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>John Doe</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 48, paddingLeft: 20, paddingRight: 20, paddingTop: 13, paddingBottom: 13, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>$15.99</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 36, paddingLeft: 20, paddingRight: 20, paddingTop: 7, paddingBottom: 7, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                        <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 22, wordWrap: 'break-word'}}>MM/DD/YYYY</div>
                    </div>
                    <div style={{flex: '1 1 0', height: 60, paddingLeft: 20, paddingRight: 20, paddingTop: 17, paddingBottom: 17, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, background: 'rgba(255, 198, 0, 0.16)', borderRadius: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <div style={{color: '#FFC600', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 14, wordWrap: 'break-word'}}>Pending</div>
                            <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(90deg)', transformOrigin: '0 0'}}>
                                <div style={{width: 4.93, height: 8, left: 5.33, top: 4, position: 'absolute', background: '#FFC600'}}></div>
                            </div>
                        </div>
                    </div>
                    <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 18, paddingBottom: 18, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{width: 24, height: 24, position: 'relative'}}>
                            <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute', background: '#8B909A'}}></div>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'stretch', paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
                        <div style={{color: '#8B909A', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '500', letterSpacing: 0.43, wordWrap: 'break-word'}}>Showing</div>
                        <div style={{borderRadius: 6, overflow: 'hidden', border: '1px #E9E7FD solid', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                            <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, justifyContent: 'center', alignItems: 'center', gap: 6, display: 'flex'}}>
                                <div style={{color: '#23272E', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '500', letterSpacing: 0.43, wordWrap: 'break-word'}}>10</div>
                                <div style={{width: 16, height: 16, position: 'relative'}}>
                                    <div style={{width: 16, height: 16, left: 0, top: 0, position: 'absolute'}}></div>
                                    <div style={{width: 8, height: 4, left: 4, top: 6, position: 'absolute', border: '1.75px #23272E solid'}}></div>
                                </div>
                            </div>
                        </div>
                        <div style={{color: '#8B909A', fontSize: 15, fontFamily: 'Public Sans', fontWeight: '500', letterSpacing: 0.43, wordWrap: 'break-word'}}>of 50</div>
                    </div>
                    <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
                        <div style={{width: 28, alignSelf: 'stretch', paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4, background: '#F1F2F6', borderRadius: 4, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                            <div style={{width: 16, height: 16, position: 'relative'}}>
                                <div style={{width: 16, height: 16, left: 0, top: 0, position: 'absolute'}}></div>
                                <div style={{width: 4, height: 8, left: 6, top: 4, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                            </div>
                        </div>
                        <div style={{width: 28, alignSelf: 'stretch', paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4, background: '#0F60FF', boxShadow: '0px 2px 4px rgba(165, 163, 174, 0.30)', borderRadius: 4, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                            <div style={{color: 'white', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>1</div>
                        </div>
                        <div style={{width: 28, alignSelf: 'stretch', paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4, background: '#F1F2F6', borderRadius: 4, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                            <div style={{color: '#8B909A', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>2</div>
                        </div>
                        <div style={{width: 28, alignSelf: 'stretch', paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4, background: '#F1F2F6', borderRadius: 4, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                            <div style={{color: '#8B909A', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>3</div>
                        </div>
                        <div style={{width: 28, alignSelf: 'stretch', paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4, background: '#F1F2F6', borderRadius: 4, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                            <div style={{color: '#8B909A', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>4</div>
                        </div>
                        <div style={{width: 28, alignSelf: 'stretch', paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4, background: '#F1F2F6', borderRadius: 4, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                            <div style={{color: '#8B909A', fontSize: 13, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>5</div>
                        </div>
                        <div style={{width: 28, alignSelf: 'stretch', paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4, background: '#F1F2F6', borderRadius: 4, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                            <div style={{width: 16, height: 16, position: 'relative'}}>
                                <div style={{width: 16, height: 16, left: 0, top: 0, position: 'absolute'}}></div>
                                <div style={{width: 4, height: 8, left: 6, top: 4, position: 'absolute', border: '1.75px #8B909A solid'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default OrderManagement;
