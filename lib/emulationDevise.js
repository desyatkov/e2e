async function emulateDevice(page, userAgent, width = 375, height=667, isMobile=true) {
  await __PAGE__.emulate({
    viewport: {
      width,
      height,
      isMobile
    },
    userAgent
  });
}

export default emulateDevice
