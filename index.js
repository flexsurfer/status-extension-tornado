import React, {useState, useRef} from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView
} from "react-native";

let statusAPI;
let account;

function Init(api) {
    statusAPI = api;
    statusAPI.ethereum.request({method: "eth_requestAccounts"}).then((res) => {
        account = res[0]
    });
}

function ChatCommandView() {

    return (
        <View style={{
            flex: 1,
            backgroundColor: "black",
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16
        }}>
            <TouchableOpacity onPress={() => {
                statusAPI.close()
            }}>
                <View style={{
                    height: 26,
                    width: 26,
                    marginTop: 10,
                    marginLeft: 10,
                    backgroundColor: "#94febf",
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text style={{fontWeight: "bold"}}>X</Text>
                </View>
            </TouchableOpacity>
            <View style={{flex: 1, padding: 30}}>
                <Text style={{color: "#eee", fontWeight: "bold"}}>Token</Text>
                <Text style={{color: "#eee", borderWidth: 1, borderColor: "#eee", padding: 10, marginVertical: 10}}>
                    ETH
                </Text>
                <Text style={{color: "#eee", fontWeight: "bold"}}>Amount</Text>
                <View style={{flexDirection: "row"}}>
                    <View style={{alignItems: "center"}}>
                        <View style={{
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            borderColor: "#94febf",
                            borderWidth: 1,
                            backgroundColor: "#94febf",
                            margin: 10
                        }}/>
                        <Text style={{color: "#94febf"}}>0.1 ETH</Text>
                    </View>
                    <View style={{alignItems: "center", marginLeft: 20}}>
                        <View style={{
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            borderColor: "#94febf",
                            borderWidth: 1,
                            margin: 10
                        }}/>
                        <Text style={{color: "#94febf"}}>1 ETH</Text>
                    </View>
                    <View style={{alignItems: "center", marginLeft: 20}}>
                        <View style={{
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            borderColor: "#94febf",
                            borderWidth: 1,
                            margin: 10
                        }}/>
                        <Text style={{color: "#94febf"}}>10 ETH</Text>
                    </View>
                    <View style={{alignItems: "center", marginLeft: 20}}>
                        <View style={{
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            borderColor: "#94febf",
                            borderWidth: 1,
                            margin: 10
                        }}/>
                        <Text style={{color: "#94febf"}}>100 ETH</Text>
                    </View>

                </View>
                <TouchableOpacity onPress={() => {
                    statusAPI.ethereum.request({
                        method: "eth_sendTransaction", params: [{
                            to: "0x2127edab5d08b1e11adf7ae4bae16c2b33fdf74a",
                            from: account,
                            value: "0xE8D4A51000"
                        }]
                    }).then((res) => {
                        console.log("TXRESULT" + res)
                        statusAPI.sendCommand({secret: "SECRET", value: "0.1 ETH"});
                        statusAPI.close();
                    }).catch((res) => {
                        console.log("err" + res)
                    });
                }}>
                    <View style={{
                        height: 40,
                        backgroundColor: "#94febf",
                        borderRadius: 5,
                        marginTop: 20,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text style={{fontWeight: "bold"}}>Deposit and send</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function MessageView(props) {

    const [used, setUsed] = useState(false);

    return (
        <View style={{padding: 20, backgroundColor: "black", borderRadius: 20}}
              key={props.id}>
            <Text style={{color: "#94febf", fontWeight: "bold"}}>Tornado.cash</Text>
            <Text style={{color: "#eee"}}>{((props.outgoing) ? "Sent " : "Withdraw ")+ props.params.value}</Text>
            {(!props.outgoing && !used) &&
               <TouchableOpacity onPress={() => {
                statusAPI.ethereum.request({
                    method: "eth_sendTransaction", params: [{
                        to: "0x2127edab5d08b1e11adf7ae4bae16c2b33fdf74a",
                        from: account,
                        value: "0xE8D4A51000"
                    }]
                }).then((res) => {
                    setUsed(true);
                }).catch((res) => {
                    console.log("err" + res)
                });
            }}>
                <View style={{
                    height: 40,
                    backgroundColor: "#94febf",
                    borderRadius: 5,
                    marginTop: 20,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text style={{fontWeight: "bold"}}>Withdraw</Text>
                </View>
            </TouchableOpacity>}
        </View>
    );
}

function WalletMainSCreenWindowView() {
    const [sent, setSent] = useState([]);

    return (
        <View style={{
            flex: 1,
            backgroundColor: "black",
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16
        }}>
            <View style={{flex: 1, padding: 30}}>
                <Text style={{color: "#eee", fontWeight: "bold"}}>Token</Text>
                <Text style={{color: "#eee", borderWidth: 1, borderColor: "#eee", padding: 10, marginVertical: 10}}>
                    ETH
                </Text>
                <Text style={{color: "#eee", fontWeight: "bold"}}>Account</Text>
                <TouchableOpacity onPress={() => {
                    statusAPI.selectAddress()
                }}>
                <Text style={{color: "#eee", borderWidth: 1, borderColor: "#eee", padding: 10, marginVertical: 10}}>
                    0x1234...1243
                </Text>
                </TouchableOpacity>
                <Text style={{color: "#eee", fontWeight: "bold"}}>Amount</Text>
                <View style={{flexDirection: "row"}}>
                    <View style={{alignItems: "center"}}>
                        <View style={{
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            borderColor: "#94febf",
                            borderWidth: 1,
                            backgroundColor: "#94febf",
                            margin: 10
                        }}/>
                        <Text style={{color: "#94febf"}}>0.1 ETH</Text>
                    </View>
                    <View style={{alignItems: "center", marginLeft: 20}}>
                        <View style={{
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            borderColor: "#94febf",
                            borderWidth: 1,
                            margin: 10
                        }}/>
                        <Text style={{color: "#94febf"}}>1 ETH</Text>
                    </View>
                    <View style={{alignItems: "center", marginLeft: 20}}>
                        <View style={{
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            borderColor: "#94febf",
                            borderWidth: 1,
                            margin: 10
                        }}/>
                        <Text style={{color: "#94febf"}}>10 ETH</Text>
                    </View>
                    <View style={{alignItems: "center", marginLeft: 20}}>
                        <View style={{
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            borderColor: "#94febf",
                            borderWidth: 1,
                            margin: 10
                        }}/>
                        <Text style={{color: "#94febf"}}>100 ETH</Text>
                    </View>

                </View>
                <TouchableOpacity onPress={() => {
                    statusAPI.ethereum.request({
                        method: "eth_sendTransaction", params: [{
                            to: "0x2127edab5d08b1e11adf7ae4bae16c2b33fdf74a",
                            from: account,
                            value: "0xE8D4A51000"
                        }]
                    }).then((res) => {
                        console.log("TXRESULT" + res)
                        setSent([...sent, "0.1"]);
                    }).catch((res) => {
                        console.log("err" + res);
                    });
                }}>
                    <View style={{
                        height: 40,
                        backgroundColor: "#94febf",
                        borderRadius: 5,
                        marginTop: 20,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text style={{fontWeight: "bold"}}>Deposit and send</Text>
                    </View>
                </TouchableOpacity>

                <View>
                    {sent.map((task) => (
                        <View style={{flexDirection: "row", alignItems: "center", marginTop: 20}}>
                            <Text style={{color: "#eee", marginRight: 20}}>0.1 ETH</Text>
                            <TouchableOpacity onPress={() => {
                                statusAPI.ethereum.request({
                                    method: "eth_sendTransaction", params: [{
                                        to: "0x2127edab5d08b1e11adf7ae4bae16c2b33fdf74a",
                                        from: account,
                                        value: "0xE8D4A51000"
                                    }]
                                }).then((res) => {
                                    console.log("res" + res)
                                }).catch((res) => {
                                    console.log("err" + res)
                                });
                            }}>
                                <View style={{
                                    height: 40,
                                    backgroundColor: "#94febf",
                                    borderRadius: 5,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Text style={{fontWeight: "bold"}}>Withdraw</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

export default [{
    scope: ["PERSONAL_CHATS"],
    type: "CHAT_COMMAND",
    view: ChatCommandView,
    messageView: MessageView,
    init: Init
},
{
    type: "WALLET_MAIN_SCREEN_WINDOW",
    view: WalletMainSCreenWindowView
}]
