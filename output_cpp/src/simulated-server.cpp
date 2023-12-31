
#include "./services/communication-layer-impl.cpp"
#include <mosquitto.h>
#include <signal.h>
#include <stdint.h>
#include <string.h>
#include <unistd.h>

#define DEFAULT_SLEEP 125000 // microseconds

/**
 * The broker host. There is an instance of Mosquitto running at 192.168.1.104
 * For the simulated server we suggest to use a local instance of Mosquitto
 *
 * TODO: Adjust the value to point to your mosquitto host
 **/
#define mqtt_host "localhost"
#define mqtt_port 1883

static int run = 1;

typedef struct
{
    int type;
    char mode;
    char* payload;
    int last;
} progress_info;

progress_info progress;

void handle_signal(int s)
{
    run = 0;
}

int main(int argc, char* argv[])
{

    uint8_t reconnect = true;
    char clientid[24];
    int rc = 0;

    signal(SIGINT, handle_signal);
    signal(SIGTERM, handle_signal);

    mosquitto_lib_init();

    memset(clientid, 0, 24);
    snprintf(clientid, 23, "simulated_server_%d", getpid());
    mosq = mosquitto_new(clientid, true, NULL);
    progress.last = 0;
    if (mosq) {
        mosquitto_message_callback_set(mosq, message_callback);

        rc = mosquitto_connect(mosq, mqtt_host, mqtt_port, 60);

        // subscribe on all relevant topics
        topicsImpl.subscribe_all_topics();

        // publishes the metainfo of the robot
        // MetaInfoObject mi = initial_metainfo();
        // publish_message(METAINFO_TOPIC,mi.to_json().dump().c_str());
        std::cout << std::endl
                  << std::endl
                  << "Server ready to send/receive messages "
                  << std::endl
                  << std::endl;

        rc = mosquitto_loop_start(mosq);
        while (run) {

            if (run && rc) {
                printf("connection error!\n");
                sleep(1);
                mosquitto_reconnect(mosq);
            } else {
                // printf("server conected to mosquitto broker!\n");
            }
        }
        mosquitto_loop_stop(mosq, true);
        mosquitto_destroy(mosq);
    }

    mosquitto_lib_cleanup();

    return rc;
}
