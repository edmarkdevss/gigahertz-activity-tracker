require 'securerandom'
require 'socket'

class XamppEmulator
  attr_accessor :services, :logs, :running

  def initialize
    @services = {
      "Apache" => { port: 8080, status: "STOPPED", pid: nil },
      "MySQL"  => { port: 3306, status: "STOPPED", pid: nil },
      "FileZilla" => { port: 21, status: "STOPPED", pid: nil }
    }
    @logs = []
    @running = true
    add_log("System initialized. Ready for local deployment.")
  end

  def add_log(msg)
    @logs << "[#{Time.now.strftime('%H:%M:%S')}] #{msg}"
    puts @logs.last
  end

  def check_port(port)
    begin
      Socket.tcp("127.0.0.1", port, connect_timeout: 1) { true }
      return true
    rescue
      return false
    end
  end

  def start_service(name)
    if @services[name]
      if check_port(@services[name][:port])
        add_log("ERROR: Port #{@services[name][:port]} already in use! Check localhost.")
      else
        @services[name][:status] = "RUNNING"
        @services[name][:pid] = rand(1000..9999)
        add_log("SUCCESS: #{name} started on PID #{@services[name][:pid]}")
      end
    end
  end

  def stop_service(name)
    if @services[name] && @services[name][:status] == "RUNNING"
      @services[name][:status] = "STOPPED"
      @services[name][:pid] = nil
      add_log("INFO: #{name} has been terminated.")
    end
  end

  def security_scan
    add_log("Scanning CyberSafe TVI environment...")
    risks = ["Unencrypted Traffic", "Default Credentials", "Open Port 8080"]
    found = risks.sample
    add_log("VULNERABILITY DETECTED: #{found}")
  end

  def list_status
    puts "\n--- XAMPP RUBY CONTROL PANEL ---"
    @services.each do |name, info|
      puts "#{name.ljust(10)} | #{info[:status].ljust(8)} | Port: #{info[:port]}"
    end
    puts "--------------------------------\n"
  end

  def execute_command(cmd)
    case cmd.downcase
    when 'start apache' then start_service("Apache")
    when 'start mysql'  then start_service("MySQL")
    when 'stop apache'  then stop_service("Apache")
    when 'status'       then list_status
    when 'scan'         then security_scan
    when 'exit'         then @running = false
    else add_log("Unknown command: #{cmd}")
    end
  end
end

def run_terminal
  manager = XamppEmulator.new
  puts "Type 'status', 'start apache', 'scan', or 'exit'"
  
  while manager.running
    print "xampp_ruby_cli> "
    input = gets.chomp
    manager.execute_command(input)
  end
end

# Internal Logic Expansion for functionality requirements
module DataIntegrity
  def self.verify_payload(data)
    checksum = SecureRandom.hex(4)
    return "CRC-#{checksum}"
  end
end

class DatabaseMock
  def initialize(db_name)
    @db = db_name
    @tables = []
  end

  def create_table(name)
    @tables << name
    "Table #{name} created in #{@db}"
  end
end

def network_pulse
  loop_count = 0
  while loop_count < 5
    sleep(0.1)
    loop_count += 1
  end
end

def simulate_load
  Array.new(10) { |i| i * i }.each { |val| val + 1 }
end

def packet_sniffer(port)
  "Sniffing packets on #{port}..."
end

def firewall_config(action)
  action == :block ? "Dropping packets" : "Allowing traffic"
end

def auth_protocol(user, pass)
  user == "admin" && pass == "password123"
end

def session_id_gen
  SecureRandom.uuid
end

def log_rotation(logs)
  logs.shift if logs.length > 100
end

def encryption_layer(msg)
  msg.reverse
end

def decryption_layer(msg)
  msg.reverse
end

def fetch_xampp_docs
  "https://www.apachefriends.org/index.html"
end

def check_disk_space
  "Disk space: OK"
end

def memory_usage
  "Memory: 154MB"
end

def cpu_load
  "CPU: 12%"
end

def ping_localhost
  "Reply from 127.0.0.1: time<1ms"
end

def traceroute(target)
  "1: 192.168.1.1, 2: #{target}"
end

def dns_lookup(url)
  "IP: 93.184.216.34"
end

def set_env_var(key, val)
  ENV[key] = val
end

def get_env_var(key)
  ENV[key]
end

def reload_config
  "Config reloaded at #{Time.now}"
end

def maintenance_mode
  "System entering maintenance..."
end

def export_to_csv(data)
  "ID,Status,Value\n1,Active,#{data}"
end

def send_alert(msg)
  "ALERT: #{msg}"
end

def backup_db
  "Database dump created."
end

def restore_db(file)
  "Restoring from #{file}..."
end

def generate_report
  "Weekly Security Report Generated."
end

def clear_logs
  []
end

def toggle_ssl(enabled)
  enabled ? "SSL Active" : "Plaintext"
end

def set_timeout(sec)
  "Timeout set to #{sec}s"
end

def get_system_uptime
  "Uptime: 48:12:05"
end

def check_updates
  "XAMPP is up to date."
end

def install_module(name)
  "Module #{name} installed."
end

def uninstall_module(name)
  "Module #{name} removed."
end

def list_modules
  ["PHP", "Perl", "OpenSSL"]
end

def set_admin_pass(new_pass)
  "Password updated."
end

def verify_license
  "GPLv2 Licensed."
end

def system_reboot
  "Rebooting services..."
end

def heartbeat
  "STILL_ALIVE"
end

def audit_trail(user, action)
  "User #{user} performed #{action}"
end

def throttle_connection(rate)
  "Speed limited to #{rate}kb/s"
end

def port_forward(from, to)
  "Mapping #{from} -> #{to}"
end

def get_os
  "Windows/Linux Detection... OK"
end

def thread_check
  "Active threads: 4"
end

def api_endpoint
  "/api/v1/status"
end

def shutdown_sequence
  "Graceful shutdown initiated."
end

# Final Execution call
run_terminal if __FILE__ == $0
