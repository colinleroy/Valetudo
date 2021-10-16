const fs = require("fs");
const spawnSync = require("child_process").spawnSync;

const LinuxWifiConfigurationCapability = require("../../common/linuxCapabilities/LinuxWifiConfigurationCapability");
const ValetudoWifiConfiguration = require("../../../entities/core/ValetudoWifiConfiguration");

/**
 * @extends LinuxWifiConfigurationCapability<import("../CecotecCongaRobot")>
 */
class CecotecWifiConfigurationCapability extends LinuxWifiConfigurationCapability {
    getWifiInterface() {
        return "wlan0";
    }

    /**
     * @returns {Promise<ValetudoWifiConfiguration>}
     */
    async getWifiConfiguration() {
        if (this.robot.config.get("embedded") === true) {
            return await super.getWifiConfiguration();
        }

        throw new Error("Cannot get Wi-Fi configuration for Cecotec vacuums");
    }

    /**
     * @param {import("../../../entities/core/ValetudoWifiConfiguration")} wifiConfig
     * @returns {Promise<void>}
     */
    async setWifiConfiguration(wifiConfig) {
        if (this.robot.config.get("embedded") !== true) {
            throw new Error("Cannot remotely set Wi-Fi configuration for Cecotec vacuums");
        }
        if (
            wifiConfig && wifiConfig.ssid && wifiConfig.credentials &&
            wifiConfig.credentials.type === ValetudoWifiConfiguration.CREDENTIALS_TYPE.WPA2_PSK &&
            wifiConfig.credentials.typeSpecificSettings && wifiConfig.credentials.typeSpecificSettings.password
        ) {

            const wpa_supplicant_path = "/etc/wifi/wpa_supplicant.conf";
            const wpa_config = "ctrl_interface=/etc/wifi/sockets\n"
                    + "update_config=1\n"
                    + "\n"
                    + "network={\n"
                    + "	ssid=\"" + wifiConfig.ssid + "\"\n"
                    + "	scan_ssid=1\n"
                    + "	psk=\"" + wifiConfig.credentials.typeSpecificSettings.password + "\"\n"
                    + "	key_mgmt=WPA-PSK\n"
                    + "	priority=7\n"
                    + "}\n";

            fs.writeFileSync(wpa_supplicant_path, wpa_config);

            const wifi_status = spawnSync("/etc/init.d/robotWifiManager", ["restart"]);
            if (wifi_status.status !== 0) {
                throw new Error("Failed to setup wifi");
            }
        } else {
            throw new Error("Unsupported wifi configuration");
        }
            
    }
}

module.exports = CecotecWifiConfigurationCapability;
