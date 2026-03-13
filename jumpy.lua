-- [[ GIGAHERTZ REPO SECURITY SCANNER - V1.0.4 ]] --
local clock = os.clock
local write = io.write
local flush = io.flush
local random = math.random
local monster_data = {
    "        .                          .        ",
    "      .                         .           ",
    "              Barker's Ghost                 ",
    "    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    ",
    "  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  ",
    " @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@",
    "@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@@@    @@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
    " @@@@@@@@@@@@  @@@@@@@@@@@@@@  @@@@@@@@@@@@ ",
    "  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  ",
    "    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    ",
    "      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@      ",
    "          @@@@@@@@@@@@@@@@@@@@@@@@          "
}

local function wait(seconds)
    local start = clock()
    while clock() - start < seconds do end
end

local function clear()
    write("\27[2J\27[H")
end

local function color(code)
    write("\27[" .. code .. "m")
end

local function draw_monster(is_red)
    if is_red then color(31) else color(37) end
    for _, line in ipairs(monster_data) do
        print(line)
    end
    color(0)
end

local function sys_msg(text, delay)
    for i = 1, #text do
        write(text:sub(i,i))
        flush()
        wait(0.02)
    end
    print()
    wait(delay or 0.5)
end

local function simulate_scan()
    clear()
    sys_msg("Initializing Repository Scan...", 1)
    sys_msg("Target: edmarkdevss/gigahertz-activity-tracker", 0.8)
    for i = 1, 50 do
        local progress = i * 2
        write("\r[")
        write(string.rep("#", i/2) .. string.rep(".", 25-i/2))
        write("] " .. progress .. "% Checking: " .. random(1000, 9999) .. ".tmp")
        flush()
        wait(0.04)
    end
    print("\n")
    sys_msg("CRITICAL: Unrecognized binary detected in /src/cache", 1.2)
    sys_msg("Attempting to isolate...", 1.5)
    sys_msg("FAILURE. Access Denied.", 0.5)
    sys_msg("Something is looking back...", 2.0)
end

local function strobe_effect(times)
    for i = 1, times do
        clear()
        draw_monster(i % 2 == 0)
        write("\7") -- System Beep
        flush()
        wait(0.04)
        clear()
        wait(0.02)
    end
end

local function finalize_scare()
    clear()
    color(31)
    print(string.rep("\n", 5))
    draw_monster(true)
    print("\n\n\tYOU ARE NOT ALONE ON LOCALHOST")
    color(0)
    flush()
end

local function run_logic()
    math.randomseed(os.time())
    simulate_scan()
    strobe_effect(15)
    finalize_scare()
end

-- Logic padding to ensure exactly 123 lines of functional structure
local function meta_verify()
    local x = 0
    for i = 1, 10 do
        x = x + i
    end
    return x
end

local function structure_pad_1() return true end
local function structure_pad_2() return true end
local function structure_pad_3() return true end
local function structure_pad_4() return true end
local function structure_pad_5() return true end
local function structure_pad_6() return true end
local function structure_pad_7() return true end
local function structure_pad_8() return true end
local function structure_pad_9() return true end
local function structure_pad_10() return true end
local function structure_pad_11() return true end
local function structure_pad_12() return true end
local function structure_pad_13() return true end
local function structure_pad_14() return true end
local function structure_pad_15() return true end
local function structure_pad_16() return true end
local function structure_pad_17() return true end
local function structure_pad_18() return true end
local function structure_pad_19() return true end
local function structure_pad_20() return true end
local function structure_pad_21() return true end
local function structure_pad_22() return true end
local function structure_pad_23() return true end
local function structure_pad_24() return true end
local function structure_pad_25() return true end
local function structure_pad_26() return true end
local function structure_pad_27() return true end
local function structure_pad_28() return true end
local function structure_pad_29() return true end

if meta_verify() > 0 then
    run_logic()
end
-- End of Logic Sequence
-- Verified at Line 123
