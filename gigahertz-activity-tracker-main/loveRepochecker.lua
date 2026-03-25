-- Target Repository: gigahertz-activity-tracker
local repo_name = "edmarkdevss/gigahertz-activity-tracker"
local manifest = {"main.lua", "conf.lua", "README.md", "LICENSE", "assets", "src"}
local results = {}

function love.load()
    love.window.setTitle("Repo Validator: " .. repo_name)
    love.window.setMode(600, 450)
    
    -- Check only the specific files in the manifest
    for _, filename in ipairs(manifest) do
        local info = love.filesystem.getInfo(filename)
        if info then
            table.insert(results, {name = filename, status = "FOUND", type = info.type, color = {0.4, 1, 0.4}})
        else
            table.insert(results, {name = filename, status = "MISSING", type = "none", color = {1, 0.3, 0.3}})
        end
    end
end

function love.draw()
    love.graphics.clear(0.05, 0.05, 0.1)
    
    -- UI Header
    love.graphics.setColor(1, 1, 1)
    love.graphics.printf("TRACKER REPOSITORY CHECKLIST", 0, 20, 600, "center")
    love.graphics.setColor(0.3, 0.3, 0.3)
    love.graphics.line(50, 45, 550, 45)

    -- Results Display
    for i, item in ipairs(results) do
        local y = 60 + (i * 35)
        
        -- Draw Status Box
        love.graphics.setColor(item.color)
        love.graphics.rectangle("line", 50, y, 500, 30, 5)
        
        -- Text labels
        love.graphics.print(item.name, 70, y + 8)
        love.graphics.printf(item.status, 0, y + 8, 530, "right")
        
        -- Show type icon
        if item.status == "FOUND" then
            love.graphics.print("(" .. item.type .. ")", 250, y + 8)
        end
    end

    -- Footer
    love.graphics.setColor(0.6, 0.6, 0.6)
    love.graphics.printf("Checking directory: " .. love.filesystem.getSaveDirectory(), 0, 410, 600, "center")
end

function love.keypressed(key)
    if key == "r" then love.event.quit("restart") end
end
