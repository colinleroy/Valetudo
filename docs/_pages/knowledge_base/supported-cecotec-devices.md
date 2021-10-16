---
title: Supported Cecotec Conga Devices
category: Knowledge Base
order: 54
---
# Supported Conga Devices
[Shenzhen 3irobotix Co.,Ltd.](http://www.3irobotics.com/en/) produces white-label vacuum robots.
They are sold under various brands. For example `Cecotec Conga` or `Viomi`.
Since they are basically the same products, hopefully, Valetudo will eventually support all of them.

For now however, there's only experimental support for the Viomi-branded ones which run a customized firmware
including a miio interface. The Cecotec branded ones do not need a custom firmware, but support for those is not yet available in the official Valetudo project as the experimental code available is not complete yet (in particular regarding model detection), and we do not own the hardware.

If you want to find out more about robot vacuum research,
check out [Dennis' Vacuum Robot Overview](https://dontvacuum.me/robotinfo/).

At least some of the Conga models have an internal timezone set to CST-8, which poses problems with timers as Valetudo expects the host to be on UTC.
You can fix it by editing /etc/config/system and rebooting the vaccuum.
