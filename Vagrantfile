
Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/jammy64"

  config.vm.box_check_update = false

  config.vm.boot_timeout = 600

  # VM1 - CLIENTE


  config.vm.define "vm1" do |vm1|

    vm1.vm.hostname = "vm1"

    # Rede privada
    vm1.vm.network "private_network",
      ip: "192.168.56.10"

    # Configuração do VirtualBox
    vm1.vm.provider "virtualbox" do |vb|
      vb.gui = false
      vb.memory = 1024
    end

    # Instala o curl para testar a API
    vm1.vm.provision "shell", inline: <<-SHELL
      apt-get update
      apt-get install -y curl
    SHELL

  end

  # =========================
  # VM2 - SERVIDOR
  # =========================

  config.vm.define "vm2" do |vm2|

    vm2.vm.hostname = "vm2"

    # Rede privada
    vm2.vm.network "private_network",
      ip: "192.168.56.11"

    # Sincronização da aplicação
    vm2.vm.synced_folder "./",
      "/vagrant_data", create: true

    # Configuração do VirtualBox
    vm2.vm.provider "virtualbox" do |vb|
      vb.gui = false
      vb.memory = 2048
    end

   # Provisionamento automático da API
vm2.vm.provision "shell",
  path: "scripts/provisionar-vm2.sh"

  end

end
