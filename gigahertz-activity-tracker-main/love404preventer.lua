--agik kka edmark


local http = require("socket.http")
local status = "Checking..."
local color = {0.5, 0.5, 0.5}
local timer = 0
local port = "3000" -- Change this to your TS project port (e.g., 5173 for Vite)

function checkServer()
    -- Set a very short timeout so the GUI doesn't freeze
    http.TIMEOUT = 0.5
    local b, c, h = http.request("http://localhost:" .. port)
    
    if c == 200 or c == 301 or c == 302 then
        status = "ONLINE (Port " .. port .. ")"
        color = {0.2, 0.8, 0.2} -- Green
    else
        status = "OFFLINE (Error " .. (c or "N/A") .. ")"
        color = {1, 0.2, 0.2} -- Red
    end
end

function love.load()
    love.window.setTitle("TS Dev Server Monitor")
    love.window.setMode(400, 200)
    checkServer()
end

function love.update(dt)
    timer = timer + dt
    -- Re-check every 3 seconds to avoid spamming
    if timer > 3 then
        checkServer()
        timer = 0
    end
end

function love.draw()
    love.graphics.clear(0.1, 0.1, 0.1)
    
    -- Background Status Box
    love.graphics.setColor(color)
    love.graphics.rectangle("line", 20, 20, 360, 160, 10)
    
    -- Text Display
    love.graphics.setColor(1, 1, 1)
    love.graphics.printf("TYPESCRIPT PROJECT STATUS", 0, 50, 400, "center")
    
    love.graphics.setFont(love.graphics.newFont(18))
    love.graphics.setColor(color)
    love.graphics.printf(status, 0, 90, 400, "center")
    
    love.graphics.setFont(love.graphics.newFont(12))
    love.graphics.setColor(0.5, 0.5, 0.5)
    love.graphics.printf("Auto-refreshing every 3s", 0, 150, 400, "center")
end
