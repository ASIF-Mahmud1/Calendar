import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Button,
    TextInput,

} from 'react-native';
import { configureGoogleSignIn, getCurrentUser, signIn, signOut } from './google-auth'
import { listCalendar, createEvent, listEvents, createCalendar } from './google-calendar.api'
// import {event} from '../../sample/data/Event'
import ListEvents from './child-components/ListEvents'
import ListCalendars from './child-components/ListCalendars'
import { getIBMToken } from '.././utils/ibm-auth'
import { predictEmailTag } from '.././utils/ibm-predict-api'
import { Header, Label, Left } from "native-base";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default class extends React.Component {
    state = {
        loggedIn: false,
        accessToken: '',
        calendars: [],
        allEvents: [],
        viewForm: false,
        title: '',
        color: '',
        user: '',
        sdate: new Date(),
        endate: new Date(),
        mode: 'date',
        show: false,
        Show: false,
        viewCalendarFrom: false,
        name: '',

    }
    updateUser = (user) => {
        this.setState({ color: user });
    };
    setStartDate = (event, sdate) => {
        sdate = sdate || this.state.sdate;
        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            sdate,
        });
    }
    show = (mode) => {
        this.setState({
            show: true,
            mode,
        });
    }
    startdatepicker = () => {
        this.show('date');
    }
    showStartTimepicker = () => {
        this.show("time");
    };

    endatepicker = () => {
        this.Show('date');
    }
    showEndTimepicker = () => {
        this.Show("time");
    };

    Show = (mode) => {
        this.setState({
            Show: true,
            mode,
        });
    }
    setEndDate = (event, endate) => {
        endate = endate || this.state.endate;
        this.setState({
            Show: Platform.OS === 'ios' ? true : false,
            endate,
        });
    }
    componentDidMount = async () => {
        configureGoogleSignIn()
        let response = await getCurrentUser();
        if (response.success) {
            this.setState({ accessToken: response.success.accessToken, loggedIn: true })
        }
        else {
            this.setState({ loggedIn: false })
        }
    }
    handleSignOut = async () => {
        let response = await signOut()
        if (response.success) {
            this.setState({ loggedIn: false })
        }
    }

    handleSignIn = async () => {
        let response = await signIn()
        if (response.success) {
            this.setState({ loggedIn: true, accessToken: response.success.accessToken })
        }
    }
    listAllCalendar = async () => {
        const { accessToken } = this.state
        let result = await listCalendar(accessToken)
        this.setState({ calendars: result.items })
        console.log(result)
    }
    handleCreateEvent = async () => {
        const { accessToken } = this.state
        const calendarId = "9jafcfgfbo0vj1p38sr0utpd5g@group.calendar.google.com"
        const event = {
            'summary': this.state.title,
            'colorId': this.state.color,
            "end": {
                "dateTime": this.state.endate.toISOString(),
            },
            "start": {
                "dateTime": this.state.sdate.toISOString(),
            },
        }
        let result = await createEvent(accessToken, calendarId, event)
        console.log("Event response ", result)
    }
    handleCreatePreEvent = async () => {
        console.log("enter")
        const { accessToken } = this.state
        const calendarId = "9jafcfgfbo0vj1p38sr0utpd5g@group.calendar.google.com"
        const endDate = this.state.sdate.setMinutes(this.state.sdate.getMinutes())
        const startdate = this.state.sdate.setMinutes(this.state.sdate.getMinutes() - 10);
        const subevent = {
            'summary': "Pre Meeting",
            'colorId': this.state.color,
            "end": {
                "dateTime": new Date(endDate).toISOString()
            },
            "start": {
                "dateTime": new Date(startdate).toISOString(),
            },
        }
        let result = await createEvent(accessToken, calendarId, subevent)
        console.log("Event response ", result)
    }
    handleCreatePostEvent = async () => {
        console.log("post")
        const { accessToken } = this.state
        const calendarId = "9jafcfgfbo0vj1p38sr0utpd5g@group.calendar.google.com"
        const startDate = this.state.endate.setMinutes(this.state.endate.getMinutes());
        const endDate = this.state.endate.setMinutes(this.state.endate.getMinutes() + 10);
        const subevent = {
            'summary': "Post Meeting",
            'colorId': this.state.color,
            "end": {
                "dateTime": new Date(endDate).toISOString()
            },
            "start": {
                "dateTime": new Date(startDate).toISOString()
            },
        }
        let result = await createEvent(accessToken, calendarId, subevent)
        console.log("Event response ", result)
    }
    handleListEvents = async (calendarId) => {
        const { accessToken } = this.state
        calendarId = calendarId.replace("#", "%23")
        let result = await listEvents(accessToken, calendarId)
        this.setState({ allEvents: result.items ? result.items : [] })
        console.log("List Events response ", result)
    }

    handleIBMToken = async () => {
        let response = await getIBMToken("dfsd")
        let result = await predictEmailTag(response.access_token)
        alert(JSON.stringify(result))
    }
    handleCreateCalendar = async () => {
        const { accessToken } = this.state
        const calendar = {
            'summary': this.state.name,
        }
        let result = await createCalendar(accessToken, calendar)
        console.log("Event response ", result)
    }

    ShowForm = () => {
        this.setState({
            viewForm: !this.state.viewForm,
        });
    };
    addForm() {
        if (this.state.viewForm) {
            return (
                <View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Add Event Title'
                            value={this.state.title}
                            onChangeText={(title) => {
                            this.setState({ title: title });
                            }} />
                        <View
                            style={styles.Picker}>
                            <Picker
                                placeholder="color"
                                style={styles.PickerItem}
                                selectedValue={this.state.color}
                                onValueChange={this.updateUser}
                                itemStyle={{ height: 120, transform: [{ scaleX: 1 }, { scaleY: 1 }] }}>

                                <Picker.Item label="Color" value="" />
                                <Picker.Item label="Lavender" value="1" color="#B2A4D4" />
                                <Picker.Item label="Sage" value="2" color="#33b679" />
                                <Picker.Item label="Grape" value="3" color="#8e24aa" />
                                <Picker.Item label="Flamingo" value="4" color="#e67c73" />
                                <Picker.Item label="Banana" value="5" color="#f6c026" />
                                <Picker.Item label="Tangerine" value="6" color="#f5511d" />
                                <Picker.Item label="Peacock" value="7" color="#039be5" />
                                <Picker.Item label="Graphite" value="8" color="#616161" />
                                <Picker.Item label="Blueberry" value="9" color="#00008B" />
                                <Picker.Item label="Basil" value="10" color="#0b8043" />
                                <Picker.Item label="Tomato" value="11" color="#FF6347" />
                            </Picker>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Label style={{ color: 'black', fontSize: 18, marginLeft: 150, marginTop: 10 }}>Start</Label>
                            <TouchableOpacity style={{ marginLeft: 50 }} onPress={() => { this.startdatepicker() }}>
                                <Text style={styles.DateText}>{moment(this.state.sdate).format('YYYY-MM-DD')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginRight: 150 }} onPress={() => { this.showStartTimepicker() }}>
                                <Text style={styles.TimeText}>{moment(this.state.sdate).format('h:mm a')}</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.show &&
                            <DateTimePicker value={this.state.sdate}
                                mode={this.state.mode}
                                is24Hour={true}
                                display="default"
                                onChange={this.setStartDate} />
                        }
                        <View style={{ flexDirection: 'row' }}>
                            <Label style={{ color: 'black', fontSize: 18, marginLeft: 160, marginTop: 10 }}>End</Label>

                            <TouchableOpacity style={{ marginLeft: 60 }} onPress={() => { this.endatepicker() }}>
                                <Text style={styles.DateText}>{moment(this.state.endate).format('YYYY-MM-DD')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginRight: 160 }} onPress={() => { this.showEndTimepicker() }}>
                                <Text style={styles.TimeText}>{moment(this.state.endate).format('h:mm a')}</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.Show &&
                            <DateTimePicker value={this.state.endate}
                                mode={this.state.mode}
                                is24Hour={true}
                                display="default"
                                onChange={this.setEndDate}
                            />
                        }
                        <View style={{ margin: 30 }}>
                            <TouchableOpacity
                                style={styles.create}
                                onPress={() => { this.handleCreateEvent(), this.handleCreatePreEvent(); this.handleCreatePostEvent(); this.setState({ title: '', color: '', sdate: new Date(), endate: new Date() }) }} >
                                <Text style={styles.createtext}>Create </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }
    }
    ShowCalendarForm = () => {
        this.setState({
            viewCalendarFrom: !this.state.viewCalendarFrom,
        });
    };
    calendarForm() {
        if (this.state.viewCalendarFrom) {
            return (
                <View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Add Event Title'
                            value={this.state.name}
                            onChangeText={(name) => {
                                this.setState({ name: name });
                            }}
                        />
                        <View style={{ margin: 5 }}>
                            <TouchableOpacity
                                style={styles.create}
                                onPress={() => { this.handleCreateCalendar(), this.setState({ name: '' }) }}>
                                <Text style={styles.createtext}>Create </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            )
        }
    }
    render() {
        return (
            <View>
                <Header>
                    {
                        this.state.loggedIn == false ?
                            <View >
                                <TouchableOpacity
                                    style={{ marginTop: 15, marginLeft: 250 }}
                                    // style={styles.signIn}
                                    onPress={() => { this.handleSignIn() }} >
                                    <View style={{ flexDirection: 'row' }}>
                                        <FontAwesomeIcon icon={faSignInAlt} style={{ color: 'white', marginTop: 5 }} size={20} />

                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 5, marginBottom: 5 }}>Login</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{ marginTop: 10, width: 100, marginLeft: 250 }} >
                                <TouchableOpacity
                                    // style={styles.signOut}
                                    onPress={() => { this.handleSignOut() }}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <FontAwesomeIcon icon={faSignOutAlt} style={{ color: 'white', marginTop: 5, marginLeft: 10 }} size={20} />

                                        <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 5, marginBottom: 5, fontSize: 20, marginRight: 10 }}>Logout</Text>
                                    </View>

                                </TouchableOpacity>
                            </View>
                    }


                </Header>

                <ScrollView>
                    {
                        this.state.loggedIn == false ?
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>You need to LogIn</Text>
                            </View>
                            :
                            <View>

                            </View>
                    }


                    {
                        this.state.loggedIn &&
                        <>
                            <TouchableOpacity
                                style={styles.signIn}
                                onPress={() => { this.handleIBMToken() }} >
                                <Text style={styles.text}>Get IBM Token</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.signIn}
                                onPress={() => { this.listAllCalendar() }} >
                                <Text style={styles.text}>Get All Calendars</Text>
                            </TouchableOpacity>
                            <ListCalendars calendars={this.state.calendars} handleListEvents={this.handleListEvents} />
                            <ListEvents allEvents={this.state.allEvents} />

                            <TouchableOpacity
                                style={styles.createEvent}
                                // onPress={() => { this.handleCreateEvent() }}
                                onPress={() => { this.ShowForm() }}
                            >
                                <Text style={styles.text}>Create New Event</Text>
                            </TouchableOpacity>
                            {this.addForm()}
                            <TouchableOpacity
                                style={styles.createEvent}
                                onPress={() => { this.ShowCalendarForm() }}
                            >
                                <Text style={styles.text}>Create New calendar</Text>
                            </TouchableOpacity>
                            {this.calendarForm()}

                        </>

                    }
                </ScrollView>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: 'white',
        fontWeight: "bold"
    },
    signIn: {
        backgroundColor: '#71DEA3',
        alignItems: 'center',
        marginVertical: "10%",
        paddingVertical: "5%",
        paddingHorizontal: "5%",
        marginVertical: "5%",
    },
    signOut: {
        backgroundColor: '#D91010',
        alignItems: 'center',
        marginVertical: "10%",
        paddingVertical: "5%",
        paddingHorizontal: "5%",
        marginVertical: "5%",
    },
    createEvent: {
        backgroundColor: '#841584',
        alignItems: 'center',
        marginVertical: "10%",
        paddingVertical: "5%",
        paddingHorizontal: "5%",
        marginVertical: "5%",
    },
    PickerItem: { color: '#0f0a3c', width: 150 },
    Picker: { borderColor: 'grey', borderWidth: 1, height: 50, margin: 10, flexDirection: 'row', width: 200 },
    textInput: {
        backgroundColor: '#fff',
        marginBottom: 5,
        borderBottomWidth: 1,
        width: 250,
        fontSize: 20,
        borderWidth: 1
    },
    DateText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: '600',

    },
    TimeText: {
        marginTop: 10,
        marginLeft: 36,
        fontSize: 18,
        fontWeight: '600',

    },
    create: {
        backgroundColor: '#009688',
        marginBottom: 20,
        alignItems: 'center',
        margin: 30,
        width: 200, height: 60, borderRadius: 5
    },
    createtext: {
        fontSize: 24,
        color: 'white',
        fontWeight: "bold", marginTop: 10
    },
});