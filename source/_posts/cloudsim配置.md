---
title: cloudsim 配置
categories: 编程
tags:
  - 电脑
  - 编程
translate_title: cloudsim-configuration
date: 2017-12-29 12:17:00
description:
---

## cloudsim

CloudSim simulation toolkit works on the basis of porgramatic models that are designed by carefully studying the behaviors of real world cloud system components. These are some of the models of CloudSim: Datacenter, Datacenterbroker, Host, Vm, VmScheduling, VMAllocation, Storage etc, few of these are abstract models and few are defined to its fullest. The abstract models are defined for enabling the extension of these models for user defined simulation scenarios.

## 配置 cloudsim
<!--more-->
### 配置 cloudsim(Eclipse)

1. 首先要下载 cloudsim 包,下载地址在这里:https://github.com/Cloudslab/cloudsim

   ![](https://i.imgur.com/2SDU2Ln.png)
   ![](https://i.imgur.com/7Ij6vKK.png)
   下载后解压,把解压后的东西放到 eclipse 的 workspaces,方便使用,


2. 用 eclipse 打开项目,在菜单栏上 `File>import`
   导入为一个 maven 项目,它会自动下载 pom.xml 里面的包,大家一般的错误就是缺少相应的依赖包:
   ![](https://i.imgur.com/Te6s3kV.png)
   ![](https://i.imgur.com/B9Gt6XT.png)
   导入后就出现了项目,等下面的进度条走完就好了,
   ![](https://i.imgur.com/BLCRhbw.png)
   ![](https://i.imgur.com/G2gfEse.png)

然后打开实例,直接运行即可
<p style="color:red;font-size:50;">如果导入失败,可以尝试换一个工作区重新导入!</p>

![](https://i.imgur.com/96wF79f.png)
`console` 里面的就是输出结果

### 配置 cloudsim(idea)

> 这个比较好配置,直接导入即可

1. 点击 open,打开我们的 cloudsim 文件夹即可
   ![](https://i.imgur.com/6jCw12e.png)
2. 打开后同样需要添加依赖,import changes 就好了
   ![](https://i.imgur.com/r46XcoU.png)
   添加好后,他已经是一个完整的项目了,可以直接运行
   ![](https://i.imgur.com/Nvtw5dI.png)

## 依据 CloudSim 源代码介绍几个核心类：

```text
    (1)Cloudlet类：构建云环境下的任务。
    (2)DataCenter类：数据中心，提供虚拟化的网格资源，处理虚拟机信息的查询，包含虚拟机对资源的分配策略，云计算采用VMProvisioner处理虚拟机。
    (3)DataCenterBroker类：隐藏了虚拟机的管理，如创建、任务提交、虚拟机的销毁等。
    (4)Host类：扩展了机器对虚拟机除处理单元(PE)之外的参数分配策略，如带宽、存储空间、内存等，一台Host可对应多台虚拟机。
    (5)VirtualMachine类：虚拟机类，运行在Host上，与其它虚拟机共享资源，每台虚拟机由一个拥有者所有，可提交任务，并由VMScheduler类定制该虚拟机的调度策略。
    (6)VMScheduler类：虚拟机的调度策略，用来管理执行任务，实现了任务接口。
    (7)VMCharacteristics类：提供虚拟机描述。
    (8)VMMAllocationPolicy类：虚拟机监视器策略类，描述同一Host上的多台虚拟机共享资源的策略。
    (9)VMProvisioner类：实现数据中心的主机到虚拟机的映射。
```

1)`CloudInformationService.java（org.cloudbus.cloudsim.core）`
   Cloudsim 中最重要的类之一，它在 CloudSim 的仿真过程中保存资源列表（在现实生活中作为数据库）。这个类实现了 processEvent（SimEvent）方法，在模拟过程中，它处理七个离散类别的事件。如果仔细分析所有基本示例，将调用 CloudSim.Init（）方法，该方法将初始化 CloudInformationService 类的实例。这个类实例提供的基本服务将注册新的资源，索引和它们的发现。

2) `DataCenter.java（org.cloudbus.cloudsim）`该类通过持有主机，处理元素（Pe）和存储为列表的实例来模仿真实数据中心的基础架构功能。同时，为了方便您的模型和地理位置的可用性，它将初始化 DataCenterCharacteristics。这个类还实现了自己的 processEvent（SimEvent）方法，在模拟过程中，它处理了二十七个默认离散事件类别，如资源信息收集，虚拟机生命周期，云端提交状态等。

3) `DataCenterBroker.java（org.cloudbus.cloudsim）`
4) `CloudSimShutdown.java（org.cloudbus.cloudsim.core）`
5) `NetDatacenterBroker.java（org.cloudbus.cloudsim.network.datacenter）`
6) `Switch.java（org.cloudbus.cloudsim.network.datacenter）`

在这里，在CloudSim文件夹中，有以下文件夹：

1. **例子**：这个文件夹还包含了各种基于场景的用例，这个基本上是一个非常简单的实现来演示如何使用这个模拟引擎。这些示例包含各种用例，从基于虚拟机的数据中心开始，模仿使用功耗感知模型有效处理其操作的真正数据中心的实际配置。所有这些例子都被归类为以下包/名称空间：
   1. **org.cloudbus.cloudsim.examples：**与生成基础级别基础结构实现有关的基本示例。
   2. **org.cloudbus.cloudsim.examples.network：**包含与基于拓扑的数据中心模拟相关的各种使用案例。
   3. **org.cloudbus.cloudsim.examples.network.datacenter：**这个包支持**“org.cloudbus.cloudsim.examples.network”**这个软件包，并附加了一些模仿网络支持云系统数据中心的类。
   4. **org.cloudbus.cloudsim.examples.power：**包含与功耗感知用例相关的实现，是cloudsim功耗感知模型实现最有趣的实现之一。
   5. **org.cloudbus.cloudsim.examples.power.random：**包含用于支持数据中心中的绿色计算概念的各种Power模型的实现。
   6. **org.cloudbus.cloudsim.examples.power.planetlab：**这也包含类似的功率模型实现，但是用来测试仿真的数据是从planetlab中获得的。这意味着这套示例可以处理真实的数据。
   7. **workload.planetlab：**这个软件包包含了来自地球实验室的所有数据，它是一个数据明智的数据。这进一步被'org.cloudbus.cloudsim.examples.power.planetlab'包中定义的例子所消耗。
2. **来源**：该文件夹包含所有的模型类，支持cloudsim的模拟过程。这些模型根据其属性和行为进一步在各种包/名称空间中进行结构化。以下是可用的软件包：
   1. **org.cloudbus.cloudsim：**包含与CPU，RAM，网络带宽等相关的DataCenter，Broker，Host，CPU，存储，资源，分配策略和利用模型相关的类的集合。
   2. **org.cloudbus.cloudsim.core：**包含云模拟引擎的支柱类，包括事件调度执行引擎，实体库定义，云信息服务等。
   3. **org.cloudbus.cloudsim.core.predicates：**这些类用于启用事件比较以及执行相应的事件。
   4. **org.cloudbus.cloudsim.distributions：**包含模拟过程中使用的各种标准数学分布的实现。
   5. **org.cloudbus.cloudsim.lists：**包含在主机，虚拟机，虚拟机等列表上执行的操作的实现。
   6. **org.cloudbus.cloudsim.network：**包含几个路由算法的实现，如：FloydWarshall，BRITE等
   7. **org.cloudbus.cloudsim.network.datacenter：**包含基于基于网络的数据中心模拟的与模型有关的类的实现。
   8. **org.cloudbus.cloudsim.power：**包含与功耗感知模型相关的数据中心，代理，主机，虚拟机和分配策略的扩展实现
   9. **org.cloudbus.cloudsim.power.lists：**仅包含启用了功耗感知数据中心模型的虚拟机的实现
   10. **org.cloudbus.cloudsim.power.models：**包含市场上可用的各种CPU模型的实现，并用于各种现实生活中的数据中心提供商。
   11. **org.cloudbus.cloudsim.provisioners：**包含CPU，RAM，带宽的供应程序的实施。
   12. **org.cloudbus.cloudsim.util：**包含在仿真过程中用于某些计算目的的一组类。

## CloudSimExample1 包含以下属性的声明和定义：

1. **CloudletList**：
   List <Cloudlet>类型的静态变量。通过仿真过程它将包含云类的所有实例的列表。该列表被提交给 DataCenterBroker 的实例，以便分配给特定的 VM 用于执行目的。

2. **vmlist**：一个 List <Vm>类型的静态变量，在模拟过程中，它将包含 Vm 类的所有实例的列表。该列表还将被提交给 DataCenterBroker 的实例以分配用于执行的云实例。云块到 Vm 的映射可以是随机的或特定的。这取决于用例实现。

3. **createBroker（）：**
   此方法将创建并返回 DataCenterBroker 的实例。这个方法在 main 方法里面调用也是一个静态的方法。

4. **createDatacenter(String):**
   该方法包含定义 DataCenter 配置的实现，该配置将用于在仿真过程中处理云的执行。此方法将数据中心名称作为名称，仅用于识别目的。在这个方法中，只有 DataCenterCharateristics 被定义了哪个实例实例化主机列表以及处理元素列表。这些列表以及存储列表，分配策略和 DataCenterCharacteristics 的实例将创建 DataCenter 实例并返回到主方法调用。

5. **printCloudletList(List<Cloudlet>):**
   一旦模拟结束，此方法用于打印模拟结果。

6. **main(string args[])**：这个方法是一旦你点击运行按钮就被调用的第一个方法。此方法包含执行下面提到的所有步骤，并按顺序执行。此方法根据执行中的步骤在需要的时候向特定的方法发送一个调用。以下步骤解释了每个步骤及其代码：

### **第一步:**

Cloudsim 仿真将被初始化以进行仿真，并且这个仿真需要下面的信息来启动：

* number of user,
* calendar instance 
* traceflag value.

所有这些参数都需要初始化 Cloudsim 仿真过程，CloudSim.init()方法初始化并发送一个调用来创建一个 CloudInfromationService 实例（创建第一个实体）。下面的代码用于此：

```java
int num_user = 1; // number of cloud users defined statically
Calendar calendar = Calendar.getInstance();
boolean trace_flag = false; // mean trace events
CloudSim.init(num_user, calendar, trace_flag);//初始化CloudSim工具包，它应该在创建任何实体之前调用
```

### **第二步**

一个数据中心实例将被创建，这是通过一个单独的`CreateDataCenter`  完成的，这个实例创建了处理元素，主机，存储，成本和数据中心特性的实例。

```java
Datacenter datacenter0 = createDatacenter("Datacenter_0");
```

这反过来将调用发送到 `createDatacenter（）`方法的以下定义：

```java
private static Datacenter createDatacenter(String name) {
    // 1.创建列表用于储存机器，简称主机列表
    List<Host> hostList = new ArrayList<Host>();
    //   2. 创建主机包含的PE或者CPU处理器列表
    List<Pe> peList = new ArrayList<Pe>();
    int mips = 1000;

    // 3. 创建处理器，并添加到Pe列表中
    peList.add(new Pe(0, new PeProvisionerSimple(mips)));
    int hostId = 0;
    int ram = 2048; // 
    long storage = 1000000; //主机容量
    int bw = 10000;
    // 4. 创建主机，并将其添加至主机列表
    hostList.add(
        new Host(hostId,
                new RamProvisionerSimple(ram),//内存提供者，为虚拟机提供内存
                new BwProvisionerSimple(bw),//带宽提供者
                storage, peList,
                new VmSchedulerTimeShared(peList)//时间共享的VM调度 ));

        String arch = "x86"; // system architecture
    String os = "Linux"; // operating system
    String vmm = "Xen";
    double time_zone = 10.0; // time zone this resource located
    double cost = 3.0; // the cost of using processing in this resource
    double costPerMem = 0.05; // the cost of using memory in this resource
    double costPerStorage = 0.001; // the cost of using storage in this resource
    double costPerBw = 0.0; // the cost of using bw in this resource

    // we are not adding SAN devices by no
    LinkedList<Storage> storageList = new LinkedList<Storage>();
// 创建数据中心特征，它表示了数据中心的资源的静态属性，比如：体系结构，操作系统，主机列表，分配策略，时间或空间共享，时区，价格
    DatacenterCharacteristics characteristics =
    new DatacenterCharacteristics(arch, os, vmm,hostList,
        time_zone,cost,costPerMem,costPerStorage, costPerBw);
// .最后，创建Power-aware数据中心
    Datacenter datacenter = null;
    try {
        datacenter = new Datacenter(name, characteristics,
            new  VmAllocationPolicySimple(hostList), storageList, 0);
    } catch (Exception e) {
        e.printStackTrace();
    }
    return datacenter;
}
```

### 第三步

一个 Datacenterbroker 实例被创建，创建代理

```java
DatacenterBroker broker = createBroker();
```

这反过来将调用发送到 createBroker（）方法的以下定义：

```java
private static DatacenterBroker createBroker()
{
    DatacenterBroker broker = null;
    try {
        broker = new DatacenterBroker("Broker");
    } catch (Exception e) {
        e.printStackTrace();
        return null;//in case of error it will return null object.
    }
    return broker;
}
```

### 第四步

创建一个虚拟机列表，然后再创建一个虚拟机，并将虚拟机添加到虚拟机列表中，然后将虚拟机列表提交到数据中心代理中

```java
// Virtual Machine parameter description
int vmid = 0;
int mips = 1000;
long size = 10000; // image size (MB)
int ram = 512; // vm memory (MB)
long bw = 1000;
int pesNumber = 1; // number of cpus
String vmm = "Xen"; // VMM name
// create VM model class instance
Vm vm = new Vm(vmid,brokerId, mips,
                pesNumber, ram, bw,
                size, vmm, new CloudletSchedulerTimeShared());

// add the VM to the vmList, which was declared in start of the class as class variable
vmlist.add(vm);
// submit vm list to the broker instance created in step 3.
broker.submitVmList(vmlist);
```

### 第五步

创建云任务列表，创建云任务，将云任务添加到列表中，将云任务列表提交给数据中心代理

```java
// Cloudlet properties
int id = 0;
long length = 400000;// estimated instruction length of your workload
long fileSize = 300;// input size of the file used for the calculation of bandwidth
long outputSize = 300;//output size of the file used for the calculation of bandwidth

//this defines how much compute capacity of allocated resource can be consumed by a cloudlet.
UtilizationModel utilizationModel = new UtilizationModelFull();

//New instance of cloudlet is created
Cloudlet cloudlet = new Cloudlet(id, length, pesNumber,
                    fileSize, outputSize, utilizationModel,
                    utilizationModel, utilizationModel);

//set to be executed through the specific broker
cloudlet.setUserId(brokerId);

/*
Defines on which VM does this cloudlet is going to be executed during the simulation.
The vmid used here is the one defined during step 4.
*/
cloudlet.setVmId(vmid);

// add the cloudlet to the list
cloudletList.add(cloudlet);
// submit cloudlet list to the broker
broker.submitCloudletList\(cloudletList\);
```

### 第六步

开始模拟，结束模拟
```java
/*
Simulation started here after all teh configurations are set.
The method calls initiate all the entities and their events
are started scheduling, then each event entity processes
its scheduled tasks. Once all the scheduled tasks are over
the call for this method is over.
*/
CloudSim.startSimulation();

/*
Once the startsimulation() method call is over and
it there is no error occured then immdeiatly after
that the stopsimulation() method is call.
This method is going to stop all the entities
and returns the control to main method.
*/
CloudSim.stopSimulation();
```

### 第七步

输出结果

```java
//Final step: Print results when simulation is over
List<Cloudlet> newList = broker.getCloudletReceivedList();
printCloudletList(newList);
```

这反过来调用 printCloudletList 方法，如下所示：

```java
private static void printCloudletList(List<Cloudlet> list)
{
    int size = list.size();
    Cloudlet cloudlet;

    String indent = "    ";
    Log.printLine();
    Log.printLine("========== OUTPUT ==========");
    Log.printLine("Cloudlet ID" + indent + "STATUS" + indent
                + "Data center ID" + indent + "VM ID" + indent + "Time" + indent
                + "Start Time" + indent + "Finish Time"+ indent + "End Waiting Time");

    DecimalFormat dft = new DecimalFormat("###.##");
    for (int i = 0; i < size; i++) {
        cloudlet = list.get(i);
        Log.print(indent + cloudlet.getCloudletId() + indent + indent);

        if (cloudlet.getCloudletStatus() == Cloudlet.SUCCESS) {
            Log.print("SUCCESS");

            Log.printLine(indent + indent + cloudlet.getResourceId()
                        + indent + indent + indent + cloudlet.getVmId()
                        + indent + indent
                        + dft.format(cloudlet.getActualCPUTime()) + indent
                        + indent + dft.format(cloudlet.getExecStartTime())
                        + indent + indent
                        + dft.format(cloudlet.getFinishTime())+ indent + indent
                        + cloudlet.getUtilizationModelCpu());
        }
    }
}
```

这最终打印出云资源在其各自资源（即 DataCenter，Broker，虚拟机等）上的执行状态。在模拟过程中，状态日志会在各种情况下打印，完整的日志可能与“ CloudSimExample1.java ” 类似。

```text
Starting CloudSimExample1...  
Initialising...  
Starting CloudSim version 3.0  
Datacenter\_0 is starting...  
Broker is starting...  
Entities started.  
0.0: Broker: Cloud Resource List received with 1 resource\(s\)  
0.0: Broker: Trying to Create VM \#0 in Datacenter\_0  
0.1: Broker: VM \#0 has been created in Datacenter \#2, Host \#0  
0.1: Broker: Sending cloudlet 0 to VM \#0  
400.1: Broker: Cloudlet 0 received  
400.1: Broker: All Cloudlets executed. Finishing...  
400.1: Broker: Destroying VM \#0  
Broker is shutting down...  
Simulation: No more future events  
CloudInformationService: Notify all CloudSim entities for shutting down.  
Datacenter\_0 is shutting down...  
Broker is shutting down...  
Simulation completed.  
Simulation completed.

========== OUTPUT ==========  
Cloudlet ID    STATUS    Data center ID    VM ID    Time    Start Time    Finish Time  
    0        SUCCESS        2            0        400        0.1        400.1  
CloudSimExample1 finished!
```

## CloudSim 的拓展

(ps:算法来自网络)
CloudSim 主要是对真实的云环境的一种模拟仿真，其各个类分别模拟了云计算的资源分配的各个过程，包括虚拟机向物理机的分配过程，计算任务向虚拟机的分配过程等等，这些分配策略分别在不同的 class 中进行了描述。由于 CloudSim 只是搭建了一个云数据中心的框架，因此具体的分配策略需要我们自己去实现，也就需要去在相应的 Class 中添加自己的策略函数。在 CloudSim 给的 examples 中，给运任务分配虚拟机的时候，使用的函数是
`broker.bindCloudletToVm(cloudlet1.getCloudletId(),vm1.getId());`
,我们可以跟进去发现，该函数是在
`DatacenterBroker.java`中，该函数使用的是直接绑定的策略，即程序中指定了云任务和虚拟机的绑定方式，如果我们需要使用自己的分配策略，就得在 `DatacenterBroker.java` 中添加自己的分配策略函数。下面分别使用两种分配策略对云任务进行分配虚拟机，分别为顺序分配策略和贪心分配策略：

## 顺序分配策略

在 DatacenterBroker 类中实现方法 bindCloudletsToVmsSimple()：用于把一组任务顺序分配给一组虚拟机，当所有的虚拟机都运行有任务后，再从第一个虚拟机开始重头分配任务。

```java
public void bindCloudletsToVmsSimple() {
        int vmNum = vmList.size();
        int cloudletNum = cloudletList.size();
        int idx = 0;
        for (int i = 0; i < cloudletNum; i++) {
            cloudletList.get(i).setVmId(vmList.get(idx).getId());
            idx = (idx + 1) % vmNum;
        }
    }
```

## 贪心策略

在`DatacenterBroker`类中实现方法`bindCloudletsToVmsTimeAwared()`：定义一个矩阵 time[i][j]，表示任务 i 在虚拟机 j 上所需的执行时间。在初始化矩阵 time 前，首先将任务按 MI 的大小降序排序，将虚拟机按 MIPS 的大小升序排列。从矩阵中行号为 0 的任务开始，每次都尝试分配给最后一列对应的虚拟机，如果该选择相对于其他选择是最优的，就完成分配，否则将任务分配给使当前结果最优的虚拟机。同时，如果有多种分配方法都能使当前结果最优，则将任务分配给运行任务最少的虚拟机。

```java
public void bindCloudletsToVmsTimeAwared() {
        int cloudletNum = cloudletList.size();
        int vmNum = vmList.size();
        // time[i][j] 表示任务i在虚拟机j上的执行时间
        double[][] time = new double[cloudletNum][vmNum];
        // cloudletList按MI降序排列, vm按MIPS升序排列
        Collections.sort(cloudletList, new CloudletComparator());
        Collections.sort(vmList, new VmComparator());
        // ////////For test//////////////////////////////////
        System.out.println("///////////For test///////////////");
        for (int i = 0; i < cloudletNum; i++) {
            System.out.print(cloudletList.get(i).getCloudletId() + ":"
                    + cloudletList.get(i).getCloudletLength() + " ");
        }
        System.out.println();
        for (int i = 0; i < vmNum; i++) {
            System.out.print(vmList.get(i).getId() + ":"
                    + vmList.get(i).getMips() + " ");
        }
        System.out.println();
        System.out.println("//////////////////////////////////");
        // ////////////////////////////////////////////////////////////////////
        for (int i = 0; i < cloudletNum; i++) {
            for (int j = 0; j < vmNum; j++) {
                time[i][j] = (double) cloudletList.get(i).getCloudletLength()
                        / vmList.get(j).getMips();
                System.out.print("time[" + i + "][" + j + "]=" + time[i][j]
                        + " ");
                // For test
            }
            System.out.println(); // For test
        }
        double[] vmLoad = new double[vmNum];// 在某个虚拟机上任务的总执行时间
        int[] vmTasks = new int[vmNum]; // 在某个Vm上运行的任务数量
        double minLoad = 0;// 记录当前任务分配方式的最优值
        int idx = 0;// 记录当前任务最优分配方式对应的虚拟机列号
        // 第一个cloudlet分配给最快的vm
        vmLoad[vmNum - 1] = time[0][vmNum - 1];
        vmTasks[vmNum - 1] = 1;
        cloudletList.get(0).setVmId(vmList.get(vmNum - 1).getId());
        for (int i = 1; i < cloudletNum; i++) {
            minLoad = vmLoad[vmNum - 1] + time[i][vmNum - 1];
            idx = vmNum - 1;
            for (int j = vmNum - 2; j >= 0; j--) {
                // 如果当前虚拟机未分配任务，则比较完当前任务分配给该虚拟机是否最优
                if (vmLoad[j] == 0) {
                    if (minLoad >= time[i][j])
                        idx = j;
                    break;
                }
                if (minLoad > vmLoad[j] + time[i][j]) {
                    minLoad = vmLoad[j] + time[i][j];
                    idx = j;
                }
                // 简单的负载均衡
                else if (minLoad == vmLoad[j] + time[i][j]
                        && vmTasks[j] < vmTasks[idx])
                    idx = j;
            }
            vmLoad[idx] += time[i][idx];
            vmTasks[idx]++;
            cloudletList.get(i).setVmId(vmList.get(idx).getId());
            System.out.print(i + "th " + "vmLoad[" + idx + "]=" + vmLoad[idx]
                    + "minLoad=" + minLoad);
            System.out.println();
        }
    }
```

如果想实现自定义任务绑定，可以自行编写 CloudletList->VmList 的映射函数，以某种方式完成任务列表中的所有 Cloudlet 的绑定工作。然后在模拟程序中，vm 列表和 cloudlet 列表提交之后调用该自定义函数，即可完成所有任务的绑定（这样自然就不需要自带的轮转法代劳了）。下面采用一种改进型轮转法来绑定任务，长任务尽量优先分配到高性能 VM 上。

> 插入到 DatacenterBroker 类中

```java
import java.util.Collections;
import java.util.Comparator
public void bindCloudletsToVmsRRImproved()
{
int vmNum=vmList.size();
int cloudletNum=cloudletList.size();
// 任务按指令长度降序，Vm按性能降序，需要导入包 java.util.Collections
Collections.sort(cloudletList, new CloudletComparator());

  Collections.sort(vmList, new VmComparator());
int idx=0;
for(int i=0;i<cloudletNum;i++) {
 //将任务绑定到指定 id 的虚拟机，按Round-Robin轮转法
 bindCloudletToVm(vmList.get(idx).getId(), cloudletList.get(i).getCloudletId())
 idx=(idx+1)%vmNum; //循环遍历虚拟机
}
}

//根据指令长度降序排列任务，需要导入包 java.util.Comparator
private class CloudletComparator implements Comparator<Cloudlet>{
public int compare(Cloudlet cl1,Cloudlet cl2){
return (int)(c12.getCloudletLength()-cl1. getCloudletLength());
}
}

//根据执行速度降序排列虚拟机
private class VmComparator implements Comparator<Vm>{
 @Override
 public int compare(Vm vm1, Vm vm2) {
 return (int) (vm2.getMips() - vm1.getMips());
 }
}
```

写完两个分配策略函数，后面可以写一个测试函数，分别对这两种分配策略进行仿真实验，并进行对比。在`org.cloudbus.cloudsim.examples`中，写一个自己的`MyAllocationTest`类，其源码为：

```java
public class MyAllocationTest {

    /** The cloudlet list. */
    private static List<Cloudlet> cloudletList;
    private static int cloudletNum = 10;

    /** The vmlist. */
    private static List<Vm> vmlist;
    private static int vmNum = 5;

    /**
    * Creates main() to run this example
    */
    public static void main(String[] args) {

        Log.printLine("Starting TestAllocation...");
        try {
            // First step: Initialize the CloudSim package. It should be called
            // before creating any entities.
            int num_user = 1; // number of cloud users
            Calendar calendar = Calendar.getInstance();
            boolean trace_flag = false; // mean trace events

            // Initialize the CloudSim library
            CloudSim.init(num_user, calendar, trace_flag);

            // Second step: Create Datacenters
            /*
             * Datacenters are the resource providers in CloudSim. We need at list one of
             *  them to run a CloudSim simulation
             */
            Datacenter datacenter0 = createDatacenter("Datacenter_0");

            //Third step: Create Broker
            DatacenterBroker broker = createBroker();
            int brokerId = broker.getId();

            //VM description
            int vmid = 0;
            int[] mipss = new int[]{278,289,132,209,286};
            long size = 10000;
            int ram = 256;
            long bw = 1000;
            int pesNumber = 1;
            String vmm = "Xen";

            //Fourth step: Create one virtual machine
            vmlist = new ArrayList<Vm>();
            for(int i=0;i<vmNum;i++){
                vmlist.add(new Vm(vmid,brokerId,mipss[i],pesNumber,
                        ram,bw,size,vmm,new CloudletSchedulerSpaceShared()));
                vmid++;
            }

            //submit vm list to the broker
            broker.submitVmList(vmlist);

            //Cloudlet properties
            int id = 0;
            long[] lengths = new long[]{19365,49809,32018,44157,16754,
                                        18336,20045,31493,30727,31017};
            long fileSize = 300;
            long outputSize = 300;
            UtilizationModel utilizationModel = new UtilizationModelFull();

            //Fifth step: Create two Cloudlets
            cloudletList = new ArrayList<Cloudlet>();
            for(int i = 0;i < cloudletNum;i++){
                Cloudlet cloudlet = new Cloudlet(id,lengths[i],pesNumber,fileSize,
                                    outputSize,utilizationModel,utilizationModel,utilizationModel);
                //add the cloudlets to the list
                cloudlet.setUserId(brokerId);
                cloudletList.add(cloudlet);
                id++;
            }

            //submit cloudlet list to the broker
            broker.submitCloudletList(cloudletList);

            //bind the cloudlets to the vms. This way, the broker
            // will submit the bound cloudlets only to the specific VM
            // 下面是顺序算法 broker.bindCloudletsToVmsSimple();
            broker.bindCloudletsToVmsSimple();
            // 下面是贪心算法broker.bindCloudletsToVmsTimeAwared();
            //broker.bindCloudletsToVmsTimeAwared();

            // Sixth step: Starts the simulation
            CloudSim.startSimulation();

            // Final step: Print results when simulation is over
            List<Cloudlet> newList = broker.getCloudletReceivedList();
            CloudSim.stopSimulation();
            printCloudletList(newList);

            //Print the debt of each user to each datacenter
            //datacenter0;
            Log.printLine("TestAllocation finished!");
        }
        catch (Exception e) {
            e.printStackTrace();
            Log.printLine("Unwanted errors happen");
        }
    }

    /**
     *
     * @Title: createDatacenter
     * @Description: TODO
     * @param: @param name
     * @param: @return
     * @return: Datacenter
     * @Date: May 17, 20167:16:32 PM
     */
    private static Datacenter createDatacenter(String name){
        // Here are the steps needed to create a PowerDatacenter:

        // 1. We need to create a list to store
        // our machine
        List<Host> hostList = new ArrayList<Host>();
        // PE and its properties
        int mips = 1000;
        int hostId=0;
        int ram = 2048; //host memory (MB)
        long storage = 1000000; //host storage
        int bw = 10000;

        // 2. A Machine contains one or more PEs or CPUs/Cores.
        List<Pe> peList = new ArrayList<Pe>();

        // 3. Create PEs and add these into a list.
        peList.add(new Pe(0, new PeProvisionerSimple(mips)));
        // need to store Pe id and MIPS Rating

        //4. Create Host with its id and list of PEs and add them to the list of machines
        hostList.add( new Host(
                hostId,
                new RamProvisionerSimple(ram),
                new BwProvisionerSimple(bw),
                storage,
                peList,
                new VmSchedulerTimeShared(peList)
                )
        ); // This is our machine

        // 5. Create a DatacenterCharacteristics object that stores the
        // properties of a data center: architecture, OS, list of
        // Machines, allocation policy: time- or space-shared, time zone
        // and its price (G$/Pe time unit).

        String arch = "x86"; // system architecture
        String os = "Linux"; // operating system
        String vmm = "Xen";
        double time_zone = 10.0; // time zone this resource located
        double cost = 3.0; // the cost of using processing in this resource
        double costPerMem = 0.05; // the cost of using memory in this resource
        double costPerStorage = 0.001; // the cost of using storage in this resource
        double costPerBw = 0.0; // the cost of using bw in this resource
        LinkedList<Storage> storageList = new LinkedList<Storage>(); //we are not adding SAN devices by now
        //创建数据中心特征对象
        DatacenterCharacteristics characteristics = new DatacenterCharacteristics( arch, os, vmm,
                hostList, time_zone, cost, costPerMem, costPerStorage, costPerBw);

        // 6. Finally, we need to create a PowerDatacenter object.
        Datacenter datacenter = null;
        try {
            datacenter = new Datacenter(name, characteristics,
                    new VmAllocationPolicySimple(hostList), storageList, 0);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return datacenter;
    }

    /*
     * We strongly encourage users to develop their own broker policies, to submit vms and cloudlets
     * according to the specific rules of the simulated scenario
     */

    /**
     *
     * @Title: createBroker
     * @Description: TODO
     * @param: @return
     * @return: DatacenterBroker
     * @Date: May 17, 20167:17:32 PM
     */
    private static DatacenterBroker createBroker() {
        DatacenterBroker broker = null;
        try {
            broker = new DatacenterBroker("Broker");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return broker;
    }

    private static void printCloudletList(List<Cloudlet> list) {
        int size = list.size();
        Cloudlet cloudlet;
        String indent = " ";
        Log.printLine();
        Log.printLine("========== OUTPUT ==========");
        Log.printLine("CloudletID" + indent + "STATUS" + indent +
                        "DatacenterID" + indent + "VMID" + indent +
                        "Time" + indent + "StartTime" + indent + "FinishTime");
        DecimalFormat dft = new DecimalFormat("###.##");
        for (int i = 0; i < size; i++)
        {
            cloudlet = list.get(i);
            Log.print(indent + cloudlet.getCloudletId() + indent + indent);
            if (cloudlet.getCloudletStatus() == Cloudlet.SUCCESS)
            {
                Log.print("SUCCESS");
                Log.printLine( indent + indent + cloudlet.getResourceId() +
                                indent + indent + indent + cloudlet.getVmId() + indent + indent +
                                dft.format(cloudlet.getActualCPUTime()) + indent + indent +
                                dft.format(cloudlet.getExecStartTime())+ indent + indent +
                                dft.format(cloudlet.getFinishTime()));
            }
        }
    }
}
```

在主函数中，分别调用函数
`broker.bindCloudletsToVmsSimple()`和`broker.bindCloudletsToVmsTimeAwared()`，表示分别启动顺序分配策略和贪心策略，其运行结果分别为：
![](https://i.imgur.com/1TVhlVE.png)
![](https://i.imgur.com/9rOm9vw.png)

贪心算法见下一篇博客