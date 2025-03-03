---
title: 决策树
createTime: 2025/02/27 21:59:24
permalink: /python/3v0oq7qs/
---
<ImageCard
image="https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/ml/decision-tree-e1.png"
/>

### 步骤分析
::: steps
1. **Step 1：分类或回归问题概述**

   决策树（Decision Tree）是一种流行的监督学习算法，用于解决分类和回归问题。它的核心思想是通过一系列的特征条件（节点）将数据划分为不同的类别或预测值，形成树状结构。决策树易于理解和解释，特别适合处理非线性关系和离散特征，但可能存在过拟合问题。

2. **Step 2：决策树模型**

    - **数据集**：$D = \{ (x_1, y_1), (x_2, y_2), \dots, (x_n, y_n) \}$，其中 $x_i \in \mathbb{R}^d$ 是 $d$ 维特征向量，$y_i$ 是目标变量（分类标签或连续值）。
    - **树结构**：
        - **根节点**：包含整个数据集，决定第一个特征分割。
        - **内部节点**：表示特征条件，用于将数据进一步划分。
        - **叶节点**：表示最终的预测结果（类别或值）。
    - **目标函数**：根据任务类型优化不同的准则：
        - **分类任务**：使用==信息增益==（Information Gain）、==信息增益率==（Gain Ratio）或==基尼指数==（Gini Index）来选择最佳分割特征。
        - **回归任务**：使用==方差减少==（Variance Reduction）或==均方误差==（Mean Squared Error, MSE）来选择分割。
    - **假设**：特征之间独立，目标变量可以通过特征的层次分割进行预测。

3. **Step 3：算法流程**

   决策树采用递归分治（Divide and Conquer）的方式构建，主要包括以下步骤：
    - **步骤 1：选择最佳分割特征**
      对于当前节点的数据集，计算每个特征的分割准则（如信息增益、基尼指数），选择使不纯度（impurity）最小的特征 $f$ 和阈值 $t$ 进行分割：
        - 分类：信息增益 = 熵（父节点） - 熵（子节点加权平均）
          $$
          \text{Entropy}(S) = -\sum_{c=1}^C p(c) \log_2 p(c)
          $$
          其中，$p(c)$ 是类别 $c$ 的概率。
        - 回归：最小化子节点方差
          $$
          \text{Variance}(S) = \frac{1}{|S|} \sum_{i \in S} (y_i - \bar{y})^2
          $$
          其中，$\bar{y}$ 是节点内目标值的均值。
    - **步骤 2：分割数据集**
      根据选定的特征 $f$ 和阈值 $t$，将数据集分为子集（对于连续特征按阈值划分，对于离散特征按值划分）。
    - **步骤 3：递归构建**
      对每个子集递归执行步骤 1 和 2，直到满足停止条件（如达到最大深度、节点样本数少于最小样本数，或不纯度无法降低）。
    - **输出**：生成一棵决策树，每个叶节点对应预测结果。

4. **Step 4：初始化与收敛**

   决策树的构建依赖于初始数据和特征选择策略：
    - **初始化**：
        - 随机选择特征或使用所有特征（取决于算法，如 CART 使用所有特征）。
        - 确定停止条件：最大深度、最大叶节点数、最小分割样本数（min_samples_split）或最小叶节点样本数（min_samples_leaf）。
    - **剪枝（Pruning）**：避免过拟合，通过以下方法优化：
        - **预剪枝（Pre-pruning）**：在构建过程中设置停止条件（如最大深度或最小样本数）。
        - **后剪枝（Post-pruning）**：构建完整树后，移除不显著的分支（如基于验证集性能或统计测试）。
    - **收敛性**：决策树是确定性算法，基于数据集和参数构建最终树，无需迭代优化，但可能陷入过拟合。

5. **Step 5：优化与评估**

   决策树的性能可以通过以下方法优化和评估：
    - **参数调优**：
        - 调整最大深度（max_depth）、最小样本数（min_samples_split、min_samples_leaf）或最大特征数（max_features）。
        - 使用随机森林（Random Forest）或梯度提升树（Gradient Boosting）减少过拟合。
    - **评估指标**：
        - **分类任务**：准确率（Accuracy）、精确率（Precision）、召回率（Recall）、F1 分数。
        - **回归任务**：均方误差（MSE）、均方根误差（RMSE）、决定系数（R²）。
        - **交叉验证（Cross-Validation）**：使用 k 折交叉验证评估模型泛化能力，防止过拟合。
    - **局限性**：
        - 对噪声数据和特征冗余敏感。
        - 容易过拟合，尤其在数据复杂或特征多时。
        - 不适合处理高维稀疏数据，可结合特征选择或降维（如 PCA）。
   > [!tip]
   > 决策树适合解释性强、数据结构清晰的任务，但对数据噪声和不平衡敏感。
   >
   > Tips：[决策树实现](https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeClassifier.html) 可参考 scikit-learn 提供的实现。
   :::
   

---

### 举例说明
>数据集：
>
>我们有以下数据，目标是根据特征来预测一个人是否会购买某个产品。
>
>| 年龄  | 收入   | 是否有车 | 是否购买 |
>| ----- | ------ | -------- | -------- |
>| 25    | 50000  | 是       | 是       |
>| 45    | 100000 | 是       | 是       |
>| 30    | 60000  | 否       | 否       |
>| 35    | 70000  | 否       | 是       |
>| 50    | 120000 | 是       | 是       |
>
>##### 步骤 1: 计算数据集的熵
>
>首先，我们计算整个数据集的熵。我们知道目标列是“是否购买”，它有两个类别：“是”和“否”。在这个数据集中，“是”有4个样本，“否”有1个样本。
>
>$$
>p(\text{是}) = \frac{4}{5} = 0.8, \quad p(\text{否}) = \frac{1}{5} = 0.2
>$$
>
>整个数据集的熵 $H(D)$ 计算为：
>
>$$
>H(D) = - \sum p_i \log_2 p_i
>$$
>
>$$
>H(D) = - (0.8 \log_2 0.8 + 0.2 \log_2 0.2) = 0.7219
>$$
>
>##### 步骤 2: 计算特征的信息增益
>
>接下来，我们计算通过特征分裂后的信息增益，看看哪个特征最有意义。
>
>`特征 1: “是否有车”`
>
>根据“是否有车”特征分裂后，数据集分为两部分：
>
>- **有车**（Yes）: 年龄为25, 45, 50，对应的“是否购买”是：[是, 是, 是]，纯度为1。
>- **没有车**（No）: 年龄为30, 35，对应的“是否购买”是：[否, 是]，纯度不为1。
>
>对于“有车”部分，熵为：
>
>$$
>H(\text{有车}) = - (1 \log_2 1) = 0
>$$
>
>对于“没有车”部分，熵为：
>
>$$
>H(\text{没有车}) = - \left( \frac{1}{2} \log_2 \frac{1}{2} + \frac{1}{2} \log_2 \frac{1}{2} \right) = 1
>$$
>
>现在，计算**加权熵**：
>
>$$
>H(D, \text{是否有车}) = \frac{3}{5} \times 0 + \frac{2}{5} \times 1 = 0.4
>$$
>
>信息增益为：
>
>$$
>\text{Gain}(\text{是否有车}) = H(D) - H(D, \text{是否有车}) = 0.7219 - 0.4 = 0.3219
>$$
>
>`特征 2: “收入”`
>
>我们可以通过收入的数值来分裂数据，但为简单起见，假设我们以一个阈值（例如 70000）来分裂“收入”特征。
>
>- **收入 <= 70000**: 年龄为25, 30, 35，对应的“是否购买”是：[是, 否, 是]。
>- **收入 > 70000**: 年龄为45, 50，对应的“是否购买”是：[是, 是]。
>
>对于“收入 <= 70000”部分，熵为：
>
>$$
>H(\text{收入} \leq 70000) = - \left( \frac{2}{3} \log_2 \frac{2}{3} + \frac{1}{3} \log_2 \frac{1}{3} \right) \approx 0.918
>$$
>
>对于“收入 > 70000”部分，熵为：
>
>$$
>H(\text{收入} > 70000) = - (1 \log_2 1) = 0
>$$
>
>现在，计算**加权熵**：
>
>$$
>H(D, \text{收入}) = \frac{3}{5} \times 0.918 + \frac{2}{5} \times 0 = 0.5508
>$$
>
>信息增益为：
>
>$$
>\text{Gain}(\text{收入}) = H(D) - H(D, \text{收入}) = 0.7219 - 0.5508 = 0.1711
>$$
>
>##### 步骤 3: 选择最优特征
>
>从上面的计算可以看到，“是否有车”特征提供的信息增益（0.3219）大于“收入”特征的信息增益（0.1711）。因此，决策树的第一个分裂应该基于“是否有车”。
>
>##### 步骤 4: 递归构建子树
>
>1. **分裂后节点 1: 有车**
>
>这个节点包含的数据都是“是”的样本（年龄25, 45, 50）。因为所有样本的目标变量都是“是”，这个分支是纯的，不需要继续分裂。
>
>2. **分裂后节点 2: 没有车**
>
>这个节点包含的数据是“否”和“是”的混合（年龄30, 35）。我们继续使用信息增益计算，选择最佳特征来进一步分裂。可能会再次选择“收入”特征来分裂。
>
>##### 最终决策树
>
>- **根节点**：是否有车
>   - **有车**: 预测为“是”（纯度为1）
>   - **没有车**: 根据收入进一步分裂：
>      - **收入 <= 70000**: 预测为“否”
>      - **收入 > 70000**: 预测为“是”
>
>##### 总结
>
>1. **选择最优特征**：首先基于“是否有车”分裂数据集。
>2. **递归分裂**：对于每个子集，继续选择最优特征进行分裂，直到所有子集都是纯的，或者满足停止条件。

### 决策树分类之鸢尾花
对 6 组特征对（例如花萼长度 vs. 花萼宽度）分别训练决策树，然后用图展示决策边界和数据点：
<ImageCard
    image="https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/ml/decision-tree-e5.png"
/>

使用鸢尾花数据集的所有 4 个特征训练一个决策树：
<ImageCard
    image="https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/ml/decision-tree-e4.png"
/>

#### 鸢尾花代码示例
::: code-tabs
@tab plot_iris_dtc.py
```python
"""
=======================================================================
Plot the decision surface of decision trees trained on the iris dataset
=======================================================================

Plot the decision surface of a decision tree trained on pairs
of features of the iris dataset.

See :ref:`decision tree <tree>` for more information on the estimator.

For each pair of iris features, the decision tree learns decision
boundaries made of combinations of simple thresholding rules inferred from
the training samples.

We also show the tree structure of a model built on all of the features.
"""

# Authors: The scikit-learn developers
# SPDX-License-Identifier: BSD-3-Clause

# %%
# First load the copy of the Iris dataset shipped with scikit-learn:
from sklearn.datasets import load_iris

iris = load_iris()


# %%
# Display the decision functions of trees trained on all pairs of features.
import matplotlib.pyplot as plt
import numpy as np
import matplotlib
matplotlib.use('TkAgg')
from sklearn.datasets import load_iris
from sklearn.inspection import DecisionBoundaryDisplay
from sklearn.tree import DecisionTreeClassifier

# Parameters
n_classes = 3
plot_colors = "ryb"
plot_step = 0.02


for pairidx, pair in enumerate([[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]]):
    # We only take the two corresponding features
    X = iris.data[:, pair]
    y = iris.target

    # Train
    clf = DecisionTreeClassifier().fit(X, y)

    # Plot the decision boundary
    ax = plt.subplot(2, 3, pairidx + 1)
    plt.tight_layout(h_pad=0.5, w_pad=0.5, pad=2.5)
    DecisionBoundaryDisplay.from_estimator(
        clf,
        X,
        cmap=plt.cm.RdYlBu,
        response_method="predict",
        ax=ax,
        xlabel=iris.feature_names[pair[0]],
        ylabel=iris.feature_names[pair[1]],
    )

    # Plot the training points
    for i, color in zip(range(n_classes), plot_colors):
        idx = np.where(y == i)
        plt.scatter(
            X[idx, 0],
            X[idx, 1],
            c=color,
            label=iris.target_names[i],
            edgecolor="black",
            s=15,
        )

plt.suptitle("Decision surface of decision trees trained on pairs of features")
plt.legend(loc="lower right", borderpad=0, handletextpad=0)
_ = plt.axis("tight")

# %%
# Display the structure of a single decision tree trained on all the features
# together.
from sklearn.tree import plot_tree

plt.figure()
clf = DecisionTreeClassifier().fit(iris.data, iris.target)
plot_tree(clf, filled=True)
plt.title("Decision tree trained on all the iris features")
plt.show()

```
:::

