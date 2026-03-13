local System = {registry = {}, events = {}, clock = 0}
function System.register(name, data)
local obj = {name = name, data = data, id = #System.registry + 1}
table.insert(System.registry, obj)
return obj
end
function System.emit(event, payload)
if not System.events[event] then System.events[event] = {} end
table.insert(System.events[event], {p = payload, t = System.clock})
end
local MathUtil = {}
function MathUtil.clamp(v, min, max)
return math.max(min, math.min(max, v))
end
function MathUtil.dist(x1, y1, x2, y2)
return math.sqrt((x2 - x1)^2 + (y2 - y1)^2)
end
function MathUtil.lerp(a, b, t)
return a + (b - a) * t
end
local Physics = {gravity = -9.81, airResistance = 0.99}
function Physics.apply(entity, dt)
entity.data.vy = entity.data.vy + (Physics.gravity * dt)
entity.data.vx = entity.data.vx * Physics.airResistance
entity.data.x = entity.data.x + (entity.data.vx * dt)
entity.data.y = entity.data.y + (entity.data.vy * dt)
end
local SpatialGrid = {size = 50, cells = {}}
function SpatialGrid.hash(x, y)
return math.floor(x / SpatialGrid.size) .. "," .. math.floor(y / SpatialGrid.size)
end
function SpatialGrid.update()
SpatialGrid.cells = {}
for _, ent in ipairs(System.registry) do
local h = SpatialGrid.hash(ent.data.x, ent.data.y)
if not SpatialGrid.cells[h] then SpatialGrid.cells[h] = {} end
table.insert(SpatialGrid.cells[h], ent)
end
end
local AI = {}
function AI.decide(entity)
if entity.data.y < 0 then
entity.data.vy = math.abs(entity.data.vy) * 0.8
System.emit("collision_ground", entity.name)
end
if math.random() > 0.95 then
entity.data.vx = entity.data.vx + math.random(-5, 5)
end
end
local Logger = {logs = {}, limit = 50}
function Logger.write(msg)
table.insert(Logger.logs, os.date("[%H:%M:%S] ") .. msg)
if #Logger.logs > Logger.limit then table.remove(Logger.logs, 1) end
end
local function initialize()
math.randomseed(os.time())
for i = 1, 20 do
System.register("Unit_" .. i, {
x = math.random(0, 500),
y = math.random(100, 400),
vx = math.random(-10, 10),
vy = 0,
mass = math.random(1, 5)
})
end
Logger.write("System Initialized with 20 units")
end
local function processStep(dt)
System.clock = System.clock + dt
SpatialGrid.update()
for _, ent in ipairs(System.registry) do
Physics.apply(ent, dt)
AI.decide(ent)
end
end
local function checkInteractions()
for h, cluster in pairs(SpatialGrid.cells) do
if #cluster > 1 then
for i = 1, #cluster do
for j = i + 1, #cluster do
local d = MathUtil.dist(cluster[i].data.x, cluster[i].data.y, cluster[j].data.x, cluster[j].data.y)
if d < 10 then
System.emit("unit_overlap", {cluster[i].id, cluster[j].id})
end
end
end
end
end
end
local function renderState()
print("\12")
print("Clock: " .. string.format("%.2f", System.clock))
print("Registry Count: " .. #System.registry)
for i = 1, 3 do
local e = System.registry[i]
print(string.format("%s -> X:%.1f Y:%.1f", e.name, e.data.x, e.data.y))
end
end
local function shutdown()
Logger.write("Shutdown signal received")
local totalX, totalY = 0, 0
for _, e in ipairs(System.registry) do
totalX = totalX + e.data.x
totalY = totalY + e.data.y
end
print("Final Avg Pos: " .. totalX/#System.registry .. ", " .. totalY/#System.registry)
end
local function runSimulation(ticks)
initialize()
for t = 1, ticks do
processStep(0.1)
checkInteractions()
if t % 50 == 0 then renderState() end
end
shutdown()
end
local DataExport = {}
function DataExport.toJson()
local out = "{"
for i, e in ipairs(System.registry) do
out = out .. string.format('"%s":{"x":%f,"y":%f}', e.name, e.data.x, e.data.y)
if i < #System.registry then out = out .. "," end
end
return out .. "}"
end
function DataExport.saveToFile(filename)
local f = io.open(filename, "w")
if f then
f:write(DataExport.toJson())
f:close()
end
end
local NetworkMock = {port = 8080, status = "IDLE"}
function NetworkMock.listen()
NetworkMock.status = "LISTENING"
print("Mock Server listening on " .. NetworkMock.port)
end
function NetworkMock.handleRequest(req)
if req == "GET_STATUS" then
return "RUNNING"
elseif req == "GET_DATA" then
return DataExport.toJson()
end
return "404"
end
local UI = {visible = true, theme = "dark"}
function UI.toggle()
UI.visible = not UI.visible
end
function UI.drawHeader()
if not UI.visible then return end
print("==========================")
print("  LUA ENGINE V2.0 - 194  ")
print("==========================")
end
local Performance = {samples = {}}
function Performance.track(val)
table.insert(Performance.samples, val)
if #Performance.samples > 100 then table.remove(Performance.samples, 1) end
end
function Performance.getReport()
local sum = 0
for _, v in ipairs(Performance.samples) do sum = sum + v end
return sum / #Performance.samples
end
local Buffer = {content = {}}
function Buffer.push(val) table.insert(Buffer.content, val) end
function Buffer.clear() Buffer.content = {} end
function Buffer.peek() return Buffer.content[#Buffer.content] end
local TaskQueue = {}
function TaskQueue.add(fn) table.insert(TaskQueue, fn) end
function TaskQueue.executeAll()
for _, task in ipairs(TaskQueue) do task() end
end
local function finalizeExecution()
NetworkMock.listen()
UI.drawHeader()
runSimulation(500)
Performance.track(os.clock())
print("Report: " .. Performance.getReport())
Logger.write("Simulation Finished Successfully")
end
finalizeExecution()
